import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {getCardsByClient, getCardById, removeCardById} from '../../services/Cards';
import './styles.css'
import { getCurrentUser } from '../../services/Clients';
import EditCard from './EditCard';

export const MyVirtualCards = () => {

    const [cards, setCards] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [cardToEdit, setCardToEdit] = useState([]);

    const history = useHistory();

    if (getCurrentUser() === null) {
        history.push("/");
        window.location.reload();
      }

    useEffect(() => {
        const getCards = async () => {
            setCards(await getCardsByClient(getCurrentUser().id))
        }

        getCards();

    }, [])

    const handleTableClick = async (type, id) => {
        if(type === "delete") {
            await removeCardById(id);
            setCards(await getCardsByClient(getCurrentUser().id))
            return;
        }

        const card = await getCardById(id);
        setCardToEdit(card);
        setShowEdit(true);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Number</th>
                        <th>Expiration Date</th>
                        <th>Brand</th>
                        <th>Funds</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cards.map(card => (
                            <tr key={card.id}>
                                <th>{card.id}</th>
                                <th>{"**** ".repeat((card.number.length - 4) / 4).toString().concat(" " + card.number.substring(card.number.length -4))}</th>
                                <th>{card.expirationDate.substring(0, 10)}</th>
                                <th>{card.cardBrand}</th>
                                <th>{card.funds.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €</th>
                                <th>
                                    <div 
                                        className="button edit" 
                                        onClick={() => handleTableClick("edit", card.id)}
                                    >
                                        Edit
                                    </div>
                                </th>
                                <th>
                                <div 
                                        className="button delete"
                                        onClick={() => handleTableClick("delete", card.id)}
                                    >
                                        Delete
                                    </div>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <EditCard show={showEdit} setShow={setShowEdit} card={cardToEdit} />

        </div>
    );
}
