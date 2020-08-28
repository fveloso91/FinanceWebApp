import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import {getClientById, createNewClient, setCurrentUser} from '../../services/Clients';


export const Home = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [logIn, setLogIn] = useState(true)
  const [signUp, setSignUp] = useState(false);

  const history = useHistory();

  const handleChange = event => {

    switch(event.target.name) {
      case 'id':
        setId(event.target.value);
        break;
      case 'name':
        setName(event.target.value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();
    var dbClient;

    if(logIn) {

      dbClient = await getClientById(id);

      if (dbClient.name !== name) {
        alert("Wrong Credentials. Try Again!");
        return;
      }

    } else {

      dbClient = await createNewClient(name);

    }

    setCurrentUser(dbClient.id, dbClient.name);

    history.push("/user");
    window.location.reload();
    
  };

  return (
    <div>
      <h1>Welcome to Financial Transactions Web API</h1>
      <form onSubmit={handleSubmit}>
        <div className="log-sign-buttons" >
          <div 
            className={logIn ? "button clicked" : "button"} 
            onClick={() => {
              setLogIn(true);
              setSignUp(false);
            }}
          >
              <span>Login</span>
          </div>
          <div 
            className={signUp ? "button clicked" : "button"} 
            onClick={() => {
              setLogIn(false);
              setSignUp(true);
            }}
          >
            <span>Sign Up</span>
          </div>
        </div>

        <div className="input-row" hidden={signUp}>
          <label htmlFor="id">ID</label>
          <input id="id" name="id" type="text" onChange={handleChange} value={id} />
        </div>
        <div className="input-row">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" onChange={handleChange} value={name} />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );

}