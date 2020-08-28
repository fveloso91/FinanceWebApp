using System.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceWebApp.DataBase;
using FinanceWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using Microsoft.AspNetCore.Http;

namespace FinanceWebApp.Services
{
    public class TransactionsService : ITransactionsService
    {
        private FinanceContext context;
        private ICardsService CardsService;

        public TransactionsService(FinanceContext context, ICardsService service)
        {
            this.context = context;
            this.CardsService = service;
        }

        public async Task<IEnumerable<Transaction>> GetAll()
        {
            return await this.context.Transactions
                .Include(c => c.Card)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Transaction> GetById(long id)
        {
            return await this.context.Transactions
                .Include(c => c.Card)
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.ID == id);
        }

        public async Task<IEnumerable<Transaction>> GetByClientId(long id)
        {
            return await this.context.Transactions
                .Include(c => c.Card)
                .Where(t => t.Card.Client.ID == id)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<string> Create(Transaction transaction)
        {
            Random random1 = new Random();
            Random random2 = new Random();
            int randNum1 = random1.Next(1000);
            int randNum2 = random2.Next(1, 9);

            if (randNum1 % randNum2 == 0)
            {
                return "DENIED";
            }


            if (!CheckPassword(transaction))
            {
                return "INVALID PASSWORD";
            };

            transaction.Card = this.context.Cards.FindAsync(transaction.Card.ID).Result;

            if (transaction.Card.IsBlocked)
            {
                return "BLOCKED CARD";
            }

            if (Decimal.Compare(transaction.Amount, Convert.ToDecimal(0.10)) < 0)
            {
                return "INVALID VALUE";
            }


            if (!CheckFunds(transaction))
            {
                return "INSUFICIENT FUNDS";
            }

            if (transaction.Type == TransactionType.CREDIT)
            {
                transaction.Card.Funds += transaction.Amount;
            }
            else
            {
                transaction.Card.Funds -= transaction.Amount;
            }

            transaction.CreatedAt = DateTime.Now;

            this.context.Transactions.Add(transaction);
            this.context.Cards.Update(transaction.Card);

            await this.context.SaveChangesAsync();

            return "APPROVED";
        }

        private bool CheckPassword(Transaction transaction)
        {
            string Password = CardsService.PasswordEncrypter(transaction.Card.Password);
            string CardPassword = this.CardsService.GetById(transaction.Card.ID).Result.Password;

            return Password.Equals(CardPassword, StringComparison.Ordinal);
        }

        private bool CheckFunds(Transaction transaction)
        {
            if(transaction.Type == TransactionType.CREDIT) {
                return true;
            }

            return transaction.Card.Funds >= transaction.Amount;
        }
    }
}