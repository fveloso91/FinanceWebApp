import React, { useEffect, useState } from 'react';  
import './styles.css';  
import { editCardInfo } from '../../services/Cards';

const EditCard = ({show, setShow, card}) => { 

    const [editableCard, setEditableCard] = useState([]);
    const [seePassword, setSeePassword] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [savedPassword, setSavedPassword] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [blockedCard, setBlockedCard] = useState(false)

    useEffect(() => {
        setEditableCard(card);
        setPassword("");
        setBlockedCard(card.isBlocked);
    },[card])

    const handleShowPopUp = () => {
        setShow(!show);
        setEditPassword(false); 
        setSeePassword(false);
    }

    const handleShowHidePassword = () => {
        setSeePassword(!seePassword);
    }

    const handleEditPassword = () => {
        setSavedPassword(false);

        if(editPassword) {
            if (confirmationPassword !== password) {
                alert("Passwords aren't equal. Please Fix it!");
                return;
            }

            setSavedPassword(true);
        }

        setEditPassword(!editPassword);
    }


    const handleRadioClick = event => {
        setBlockedCard(event.target.id === "block-card-true")
    }
    
    const handlePasswordChange = event => {

        if (event.target.id === "password") {
            setPassword(event.target.value);
        
        } else {
            setConfirmationPassword(event.target.value);
        }
    }
    

    const handleFormSubmit = async (event) => {
        
        event.preventDefault();

        if(!savedPassword) {
            alert("First Save the Password, please!")
            return;
        }
        
        var data = {
            password,
            isBlocked : blockedCard
        }

        await editCardInfo(data, editableCard.id);
    }

    return show ? 
      (
        <div hidden={!show} className='popup'>  
          <div className='popup_inner'>
            <h2>Edit your card information</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-row">
                    <div className="row-element">
                        <label htmlFor="cardHolderName">Card Holder Name</label>
                        <input type="text" id="cardHolderName" value={editableCard.cardHolderName} readOnly />
                    </div>
                    <div className="row-element">
                        <label htmlFor="number">Card Number</label>
                        <input type="text" id="number" value={editableCard.number} readOnly />
                    </div>
                </div>
                <div className="form-row">
                    <div className="row-element">
                        <label htmlFor="cardBrand">Card Brand</label>
                        <input type="text" id="cardBrand" value={editableCard.cardBrand} readOnly />
                    </div>
                    <div className="row-element">
                        <label htmlFor="date">Expiration Date</label>
                        <input type="text" id="date" value={editableCard.expirationDate.substring(0, 10)} readOnly />
                    </div>
                </div>
                <div className="form-row" hidden={!editableCard.hasPassword}>
                    <div className="row-element" hidden={!editPassword}>
                        <label htmlFor="password">Password</label>
                        <input type={seePassword ? "text" : "password"} id="password" value={password} onChange={handlePasswordChange} readOnly={!editPassword} />
                    </div>
                    <div className="row-element" hidden={!editPassword}>
                        <label htmlFor="confirm-password">Confirmation Password</label>
                        <input type={seePassword ? "text" : "password"} id="confirm-password" value={confirmationPassword} onChange={handlePasswordChange} readOnly={!editPassword} />
                    </div>
                    <div className="row-element buttons">
                        {
                            seePassword ?
                            <button type="button" id="see-password" onClick={handleShowHidePassword} >Hide Password</button> :
                            <button type="button" id="see-password" onClick={handleShowHidePassword} >See Password</button>

                        }
                        {
                            editPassword ?
                            <button type="button" id="edit-password" onClick={handleEditPassword} >Confirm Password</button> :
                            <button type="button" id="edit-password" onClick={handleEditPassword} >Change Password</button>
                        }
                    </div>
                </div>
                <div className="form-row radio">
                    <p>Block Card</p>
                    <div className="row-element radio">
                        <div className="radio-button">
                            <label htmlFor="block-card-true">True</label>
                            <input 
                                type="radio" 
                                id="block-card-true" 
                                name="block-card" 
                                onClick={handleRadioClick} 
                                defaultChecked={blockedCard}
                            />
                        </div>
                        <div className="radio-button">
                            <label htmlFor="block-card-false">False</label>
                            <input 
                                type="radio" 
                                id="block-card-false" 
                                name="block-card" 
                                onClick={handleRadioClick}
                                defaultChecked={!blockedCard}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
            <div>
                <button className="close-popup" type="button" onClick={handleShowPopUp}>Close</button>
            </div>
          </div>  
        </div>  
      ) : (
        <>
        </>
      );
}

export default EditCard;