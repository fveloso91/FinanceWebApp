using System;
using System.Collections.Generic;
using FinanceWebApp.Models;
using FinanceWebApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinanceWebApp.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClientsService clientsService;

        public ClientsController(IClientsService service)
        {
            this.clientsService = service;
        }

        [HttpGet]
        public IEnumerable<Client> GetAllClients()
        {
            return clientsService.GetAll().Result;
        }

        [HttpGet("{id}")]
        public Client GetClientById(long id)
        {
            return clientsService.GetById(id).Result;
        }

        [HttpPost]
        public Client CreateClient(Client client)
        {
            var id = this.clientsService.Create(client).Result;
            
            return GetClientById(Convert.ToInt64(id));
        }
    }
}