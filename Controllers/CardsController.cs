
using System;
using System.Collections.Generic;
using FinanceWebApp.Models;
using FinanceWebApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinancesApp.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly ICardsService cardService;

        private readonly IClientsService clientsService;

        public CardsController(ICardsService service, IClientsService clientsService)
        {
            this.cardService = service;
            this.clientsService = clientsService;
        }

        // GET: v1/cards
        [HttpGet]
        public IEnumerable<Card> GetCards()
        {
            return this.cardService.GetAll().Result;
        }

        // GET: v1/cards/1
        [HttpGet("{id}")]
        public Card GetCardById(long id)
        {
            return this.cardService.GetById(id).Result;
        }

        // GET: v1/cards/client/1
        [HttpGet("client/{id}")]
        public IEnumerable<Card> GetCardByClientId(long id)
        {
            return this.cardService.GetByClientId(id).Result;
        }

        // POST: v1/cards/
        [HttpPost]
        public Card CreateCard(Card card)
        {
            var id = this.cardService.Create(card).Result;
            
            return GetCardById(Convert.ToInt64(id));
        }

        [HttpDelete("{id}")]
        public Boolean RemoveCard(long id)
        {
            return this.cardService.Delete(id).Result;
        }

        [HttpPatch("{id}")]
        public Card UpdateCard([FromRoute] long id, [FromBody] Card card)
        {
            return this.cardService.UpdateCard(card, id).Result;
        }


    }
}