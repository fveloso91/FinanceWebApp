using System.Collections.Generic;
using System.Threading.Tasks;
using FinanceWebApp.DataBase;
using FinanceWebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceWebApp.Services
{
    public class ClientsService : IClientsService
    {
        private FinanceContext context;

        public ClientsService(FinanceContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Client>> GetAll()
        {
            return await this.context.Clients
                .Include(c => c.Cards)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Client> GetById(long id)
        {

            return await this.context.Clients
                .Include(c => c.Cards)
                .ThenInclude(c => c.Transactions)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.ID == id);
        }

        public async Task<string> Create(Client client)
        {
            this.context.Clients.Add(client);
            await this.context.SaveChangesAsync();

            return client.ID.ToString();
        }

    }
}