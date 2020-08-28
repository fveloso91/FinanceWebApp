
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FinanceWebApp.Models;

namespace FinanceWebApp.Services
{
    public interface ICardsService : IFinanceService<Card>
    {
        string PasswordEncrypter(string password);

        Task<IEnumerable<Card>> GetByClientId(long id);

        Task<Boolean> Delete(long id);

        Task<Card> UpdateCard(Card card, long id);
    }
}