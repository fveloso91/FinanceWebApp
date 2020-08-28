using FinanceWebApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FinanceWebApp.DataBase
{
    public class FinanceContext : DbContext
    {
        public FinanceContext(DbContextOptions<FinanceContext> options)
            : base(options)
        {
        }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Card> Cards { get; set; }

        public DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transaction>().ToTable("Transaction");
            modelBuilder.Entity<Card>().ToTable("Card");
            modelBuilder.Entity<Client>().ToTable("Client");

            // Save Enum as String
            modelBuilder.Entity<Card>().Property(e => e.CardBrand).HasConversion(new EnumToStringConverter<CardBrand>());
            modelBuilder.Entity<Card>().Property(e => e.Type).HasConversion(new EnumToStringConverter<CardType>());
            modelBuilder.Entity<Transaction>().Property(e => e.Type).HasConversion(new EnumToStringConverter<TransactionType>());
        
        }
    }
}