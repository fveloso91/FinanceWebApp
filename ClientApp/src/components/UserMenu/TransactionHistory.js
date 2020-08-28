import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {getTransactionByClient} from '../../services/Transactions';
import './styles.css'
import { getCurrentUser } from '../../services/Clients';

export const TransactionHistory = () => {

    const [transactions, setStransactions] = useState([]);
    const history = useHistory();

    if (getCurrentUser() === null) {
        history.push("/");
        window.location.reload();
      }

    useEffect(() => {
        const getTransactions = async () => {
            setStransactions(await getTransactionByClient(getCurrentUser().id))
        }

        getTransactions();

    }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Card Number</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <th>{transaction.id}</th>
                                <th>{transaction.createdAt.replace("T", "  |  ")}</th>
                                <th>{transaction.type === "DEBIT" ? "Withdraw" : (transaction.type === "CREDIT" ? "Deposit" : "Created")}</th>
                                <th>{(transaction.type === "DEBIT" ? "- " : " ").concat(transaction.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))} €</th>
                                <th>{"**** ".repeat((transaction.card.number.length - 4) / 4).toString().concat(" " + transaction.card.number.substring(transaction.card.number.length -4))}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    );
}
