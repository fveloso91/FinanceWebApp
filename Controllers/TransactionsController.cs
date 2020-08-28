using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using FinanceWebApp.Models;
using FinanceWebApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinancesApp.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionsService transactionService;

        public TransactionsController(ITransactionsService service)
        {
            this.transactionService = service;
        }

        // GET: v1/transactions
        [HttpGet]
        public IEnumerable<Transaction> GetTransactions()
        {
            return this.transactionService.GetAll().Result;
        }

        // GET: v1/transactions/1
        [HttpGet("{id}")]
        public Transaction GetTransaction(long id)
        {
            return this.transactionService.GetById(id).Result;
        }

        // GET: v1/transactions/client/1
        [HttpGet("client/{id}")]
        public IEnumerable<Transaction> GetTransactionByClientId(long id)
        {
            return this.transactionService.GetByClientId(id).Result;
        }

        // POST: v1/transactions/
        [HttpPost]
        public IActionResult CreateTransaction(Transaction transaction)
        {
            var response = this.transactionService.Create(transaction).Result;

            return response switch
            {
                "APPROVED" => Ok(response),
                _ => BadRequest(response)
            };
        }
    }
}