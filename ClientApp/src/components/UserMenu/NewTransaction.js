import React, {useState, useEffect}  from 'react';
import {createTransaction} from '../../services/Transactions';
import { getCurrentUser, getClientById } from '../../services/Clients';

export const NewTransaction = () => {

    const [selectedCard, setSelectedCard] = useState([]);
    const [transactionType, setTransactionType] = useState("0");
    const [password, setPassword] = useState("");
    const [amount, setAmount] = useState("");
    const [client, setClient] = useState([]);

    useEffect(() => {
        async function createUser() {
            const user = await getClientById(getCurrentUser().id);
            setClient(user);
        }
        createUser();   
    }, [])

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const data = {
            amount,
            type : transactionType,
            card : {
                id: selectedCard[0].id,
                password
            }
        }

        const response = await createTransaction(data)
    
        alert(response.data);

        if(response.data === "APPROVED") {
            setPassword("");
            setAmount("");
            window.location.reload();
        }

        
    }

    const handleOptionRendering = () => {
        if(client.length === 0) {
            return;
        }

        return client.cards.map(card => {
            return (
                <option key={card.id} value={card.number}>
                    {card.number}
                </option>
            )
        })
    }

    const handleCardSelection = (event) => {
        setSelectedCard(client.cards.filter(card => card.number === event.target.value));
    }

    const handleInputChange = (event) => {
        switch(event.target.id) {
            case "password":
                setPassword(event.target.value);
                break;
            case "amount":
                setAmount(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleTransactionTypeSelection = event => {
        setTransactionType(event.target.value);
    }

    const handlePasswordRequired = () => {
        return selectedCard[0].hasPassword;
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="transaction-type">
                <label htmlFor="transactio-type">Transaction Type</label>
                <select id="transaction-type" onChange={handleTransactionTypeSelection}>
                    <option key="0" value="">Select a Transaction Type</option>
                    <option key="1" value="DEBIT">Withdraw</option>
                    <option key="2" value="CREDIT">Deposit</option>
                </select>
            </div>
            <div className="card-selection">
                <select onChange={handleCardSelection}>
                    <option key="0" value="">Select a Card</option>
                    { handleOptionRendering() }
                </select>
            </div>
            <div>
                <label htmlFor="cardHolderName" >Card Holder Name</label>
                <input 
                    id="cardHolderName" 
                    type="text" 
                    value={selectedCard[0] === undefined ? "" : selectedCard[0].cardHolderName}
                    readOnly 
                />
            </div>
            <div>
                <label htmlFor="amount" >Amount</label>
                <input type="number" id="amount" onChange={handleInputChange} step="0.01"/>
            </div>
            <div hidden={selectedCard[0] === undefined ? true : !handlePasswordRequired()}>
                <label htmlFor="password" >Password</label>
                <input type="password" id="password" maxLength="4" onChange={handleInputChange}/>
            </div>
            <button type="submit" >Submit</button>
        </form>
    )
}