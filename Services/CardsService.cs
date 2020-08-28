using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceWebApp.DataBase;
using FinanceWebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceWebApp.Services
{
    public class CardsService : ICardsService
    {
        private FinanceContext context;

        public CardsService(FinanceContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Card>> GetAll()
        {
            return await this.context.Cards
                .Include(c => c.Client)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Card> GetById(long id)
        {
            return await this.context.Cards
                //.Include(c => c.Client.ID)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.ID == id);
        }

        public async Task<IEnumerable<Card>> GetByClientId(long id)
        {
            return await this.context.Cards
                .Where(t => t.Client.ID == id)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Boolean> Delete(long id)
        {
            Card card = GetById(id).Result;
            this.context.Cards.Remove(card);
            await this.context.SaveChangesAsync();
            card = GetById(id).Result;
            return card == null;
        }

        public async Task<string> Create(Card card)
        {
            card.Password = card.Type == CardType.BAND ? PasswordEncrypter(card.Password) : null;

            switch(card.CardBrand) {
                case CardBrand.MASTERCARD:
                    card.Number = GenerateCardNumber(12);
                    break;
                case CardBrand.MAESTRO:
                    card.Number = GenerateCardNumber(12);
                    break;
                case CardBrand.VISA:
                    card.Number = GenerateCardNumber(16);
                    break;
                default:
                    card.Number = GenerateCardNumber(16);
                    break;
            }

            card.Client = context.Clients.FirstOrDefault(c => c.ID == card.Client.ID);
            Transaction transaction = new Transaction { CreatedAt = DateTime.Now, Amount = card.Funds, Type = TransactionType.CREATED, Card = card, Number = 0 };

            this.context.Cards.Add(card);
            this.context.Transactions.Add(transaction);
            await this.context.SaveChangesAsync();
            
            return card.ID.ToString();
        }

        public async Task<Card> UpdateCard(Card card, long id)
        {
            Card toUpdateCard = GetById(id).Result;
            toUpdateCard.Password = PasswordEncrypter(card.Password);
            toUpdateCard.IsBlocked = card.IsBlocked;

            this.context.Cards.Update(toUpdateCard);
            await this.context.SaveChangesAsync();

            return toUpdateCard;
        }

        private string GenerateCardNumber(int length)
        {
            Random random = new Random();
            var db = context.Cards.Select(c => c.Number).ToList();
            
            string num;
            do 
            {
                num = "";
                for (int i = 0; i < length; i++)
                {
                    num += i == 0 ? random.Next(1, 9) : random.Next(0, 9);
                }

            } while (db.Contains(num));
            

            return num;
        }

        public string PasswordEncrypter(string password)
        {
            byte[] data = System.Text.Encoding.UTF8.GetBytes(password);
            data = new System.Security.Cryptography.SHA256Managed().ComputeHash(data);

            return System.Text.Encoding.UTF8.GetString(data);
        }
    }
}