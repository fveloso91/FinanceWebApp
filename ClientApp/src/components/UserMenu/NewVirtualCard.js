import React, {useState, useEffect} from 'react';
import { getClientById, getCurrentUser } from '../../services/Clients';
import { createCard } from '../../services/Cards';


export const NewVirtualCard = () => {

    const [cardHolderName, setCardHolderName] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [type, setType] = useState("");
    const [funds, setFunds] = useState(0.00);
    const [client, setClient] = useState([]);
    const [password, setPassword] = useState("");
    const [brand, setBrand] = useState("");

    useEffect(() => {
        async function createClient() {
            const user = await getClientById(getCurrentUser().id);
            setClient(user);
        }
        createClient();   
    }, [])

    const handleChange = event => {
        switch(event.target.name) {
            case 'name':
                setCardHolderName(event.target.value);
                break;
            case 'date':
                setExpirationDate(event.target.value);
                break;
            case 'brand':
                setBrand(event.target.value);
                break;
            case 'type':
                setType(event.target.value);
                break;
            case 'funds':
                setFunds(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const data = {
            cardHolderName,
            expirationDate,
            cardBrand : brand,
            password,
            type,
            hasPassword : type === "BAND",
            isBlocked : false,
            funds,
            client : {
                id : client.id
            }
        }

        await createCard(data);
    }

    
    return (
        <div>
            <div className="new-card-title">
                <h3>Create a new Virtual Card</h3>
            </div>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="name">Card Holder Name</label>
                        <input id="name" type="text" name="name" value={cardHolderName} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="date">Expiration Date</label>
                        <input id="date" type="date" name="date" value={expirationDate} onChange={handleChange}/>
                    </div>
                    <div>
                        <p>Brand</p>
                        <label htmlFor="visa">Visa</label>
                        <input id="visa" type="radio" name="brand" value="VISA" onClick={handleChange}/>
                        <label htmlFor="mastercard">Mastercard</label>
                        <input id="mastercard" type="radio" name="brand" value="MASTERCARD" onClick={handleChange}/>
                        <label htmlFor="maestro">Maestro</label>
                        <input id="maestro" type="radio" name="brand" value="MAESTRO" onClick={handleChange}/>
                    </div>
                    <div>
                        <p>Card Type</p>
                        <label htmlFor="band">Magnetic Band</label>
                        <input id="band" type="radio" name="type" value="BAND" onClick={handleChange}/>
                        <label htmlFor="chip">Chip</label>
                        <input id="chip" type="radio" name="type" value="CHIP" onClick={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="funds">Funds</label>
                        <input id="funds" type="number" name="funds" value={funds} onChange={handleChange}/>
                    </div>
                    <div hidden={type !== "BAND"}>
                        <label htmlFor="password" >Password</label>
                        <input type="password" id="password" name="password" maxLength="4" value={password} onChange={handleChange}/>
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>

        </div>
    )
}