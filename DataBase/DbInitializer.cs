using FinanceWebApp.Models;
using FinanceWebApp.DataBase;
using FinanceWebApp.Services;
using System;
using System.Linq;
using System.Collections.Generic;

namespace FinanceWebApp.DataBase
{
    public class DbInitializer
    {

        public static void Initialize(FinanceContext context, ICardsService cardService)
        {
            context.Database.EnsureCreated();

            // Look for any Virtual Cards.
            if (context.Cards.Any())
            {
                return;   // DB has been seeded
            }
            /*

            var transactions = new List<Transaction>()
            {

                new Transaction{Amount=100.00M,Type=TransactionType.CREDIT,Card=new Card{CardHolderName="John",Number="123456789012",ExpirationDate=DateTime.Parse("2021-09-30"),CardBrand=CardBrand.VISA,Password="1234",Type=CardType.BAND,Funds=1000.00M,Client=new Client{Name="John"}},Number=1},
                new Transaction{Amount=95.25M,Type=TransactionType.DEBIT,Card=new Card{CardHolderName="Mary",Number="341235325345",ExpirationDate=DateTime.Parse("2022-01-31"),CardBrand=CardBrand.MASTERCARD,Password=null,Type=CardType.CHIP,Funds=800.00M,Client=new Client{Name="Mary"}},Number=1},
                new Transaction{Amount=20.09M,Type=TransactionType.CREDIT,Card=new Card{CardHolderName="Ann",Number="546345653476",ExpirationDate=DateTime.Parse("2020-12-31"),CardBrand=CardBrand.MAESTRO,Password=null,Type=CardType.CHIP,Funds=100.00M,Client=new Client{Name="Ann"}},Number=1},
                new Transaction{Amount=499.99M,Type=TransactionType.CREDIT,Card=new Card{CardHolderName="Phillip",Number="452436535467",ExpirationDate=DateTime.Parse("2020-09-30"),CardBrand=CardBrand.VISA,Password=null,Type=CardType.CHIP,Funds=500.00M,Client=new Client{Name="Phillip"}},Number=1},
                new Transaction{Amount=80.00M,Type=TransactionType.DEBIT,Card=new Card{CardHolderName="Helen",Number="426565746577",ExpirationDate=DateTime.Parse("2021-06-30"),CardBrand=CardBrand.MAESTRO,Password="9843",Type=CardType.BAND,Funds=350.00M,Client=new Client{Name="Helen"}},Number=1},
                new Transaction{Amount=125.56M,Type=TransactionType.CREDIT,Card=new Card{CardHolderName="Joseph",Number="465346354754",ExpirationDate=DateTime.Parse("2021-07-31"),CardBrand=CardBrand.VISA,Password=null,Type=CardType.CHIP,Funds=400.00M,Client=new Client{Name="Joseph"}},Number=1},
                new Transaction{Amount=98.20M,Type=TransactionType.CREDIT,Card=new Card{CardHolderName="David",Number="463546735474",ExpirationDate=DateTime.Parse("2021-11-30"),CardBrand=CardBrand.MASTERCARD,Password="1468",Type=CardType.BAND,Funds=1500.00M,Client=new Client{Name="David"}},Number=1},
                new Transaction{Amount=83.43M,Type=TransactionType.DEBIT,Card=new Card{CardHolderName="Laura",Number="463547457254",ExpirationDate=DateTime.Parse("2020-07-31"),CardBrand=CardBrand.VISA,Password="1295",Type=CardType.BAND,Funds=2000.00M,Client=new Client{Name="Laura"}},Number=1}
            };

            transactions.ForEach(element => {
                if (element.Card.HasPassword) {
                    element.Card.Password = cardService.PasswordEncrypter(element.Card.Password);
                }
                element.CreatedAt = DateTime.Now;
            });

            context.Transactions.AddRange(transactions);
            context.SaveChanges();
            */
        }
    }
}