
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using FinanceWebApp.Models;

namespace FinanceWebApp.Services
{
    public interface IFinanceService<T>
    {
        Task<IEnumerable<T>> GetAll();

        Task<T> GetById(long id);

        Task<string> Create(T model);
    }

}