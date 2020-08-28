using System.Net.Http;

using System.Collections.Generic;
using System.Threading.Tasks;
using FinanceWebApp.Models;

namespace FinanceWebApp.Services
{
    public interface ITransactionsService : IFinanceService<Transaction>
    {
        Task<IEnumerable<Transaction>> GetByClientId(long id);
    }
}