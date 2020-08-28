using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace FinanceWebApp.Models
{
    public class Card
    {
        [ForeignKeyAttribute("Transaction")]
        public long ID { get; set; }

        public string CardHolderName { get; set; }

        [MaxLength(18)]
        [MinLength(12)]
        public string Number { get; set; }

        public DateTime ExpirationDate { get; set; }

        public CardBrand CardBrand { get; set; }

        [RegularExpression("[0-9]{4}")]
        public string Password 
        { 
            get {return this.password;}
            set { this.password = value;}
        }

        public CardType Type { get; set; }

        public bool HasPassword => CardType.BAND == Type;

        private String password;

        public bool IsBlocked { get; set; }
        public decimal Funds { get; set; }

        public Client Client { get; set; }

        public IEnumerable<Transaction> Transactions { get; set; }
    }

    [JsonConverter(typeof(StringEnumConverter))]  
    public enum CardType
    {
        CHIP, BAND
    }
    
    [JsonConverter(typeof(StringEnumConverter))]  
    public enum CardBrand
    {
        VISA, MASTERCARD, MAESTRO
    }
}