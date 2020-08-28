using System.ComponentModel.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace FinanceWebApp.Models
{
    public class Transaction
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }
        
        public DateTime CreatedAt { get; set; }
        public decimal Amount { get; set; }

        public TransactionType Type { get; set; }

        public Card Card { get; set; }

        public long Number { get; set; }
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum TransactionType
    {
        CREATED, CREDIT, DEBIT
    }
}