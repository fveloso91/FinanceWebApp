import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../services/Clients";
import "./styles.css";
import { NewTransaction } from "../UserMenu/NewTransaction";
import { TransactionHistory } from "../UserMenu/TransactionHistory";
import { NewVirtualCard } from "../UserMenu/NewVirtualCard";
import { MyVirtualCards } from "../UserMenu/MyVirtualCards";


export const UserDashboard = () => {

  const history = useHistory();

  const [client, setClient] = useState([]);
  const [menu, setMenu] = useState([]);

  if (getCurrentUser() === null) {
    history.push("/");
    window.location.reload();
  }

  useEffect(() => {
    async function fetchData() {
      const response = getCurrentUser();
      setClient(response);
    }
    fetchData();
  }, [])

  useEffect(() => {
    setMenu({
      nTransaction : true,
      transactionHistory : false,
      nVirtualCard : false,
      myVirtualCards : false
    })
  }, [])

  const handleMenuClick = (event) => {
    switch(event.target.id) {
      case "nTransaction":
        setMenu({
          nTransaction : true,
          transactionHistory : false,
          nVirtualCard : false,
          myVirtualCards : false
        });
        break;
      case "transactionHistory":
        setMenu({
          nTransaction : false,
          transactionHistory : true,
          nVirtualCard : false,
          myVirtualCards : false
        });
        break;
      case "nVirtualCard":
        setMenu({
          nTransaction : false,
          transactionHistory : false,
          nVirtualCard : true,
          myVirtualCards : false
        });
        break;
      case "myVirtualCards":
        setMenu({
          nTransaction : false,
          transactionHistory : false,
          nVirtualCard : false,
          myVirtualCards : true
        });
        break;
      default:
        break;
    }
  }

  const handleMenuSelection = () => {
    if(menu.nTransaction) {
      return <NewTransaction />;
    }

    if(menu.transactionHistory) {
      return <TransactionHistory />;
    }

    if(menu.nVirtualCard) {
      return <NewVirtualCard />;
    }

    if(menu.myVirtualCards) {
      return <MyVirtualCards />;
    }
  }

  return (
    <div>
      <div className="title">
        <h1>Welcome to your Dashboard, {client.name}</h1>
      </div>
      <div className="menu-bar">
        <ul>
          <li 
            className={menu.nTransaction ? "selected" : ""} 
            id="nTransaction" 
            onClick={handleMenuClick}
          >
            New Transaction
          </li>
          <li 
            className={menu.transactionHistory ? "selected" : ""} 
            id="transactionHistory" 
            onClick={handleMenuClick} 
          >
            Transaction History
          </li>
          <li 
            className={menu.nVirtualCard ? "selected" : ""} 
            id="nVirtualCard" 
            onClick={handleMenuClick}
          >
            New Virtual Card
          </li>
          <li 
            className={menu.myVirtualCards ? "selected" : ""} 
            id="myVirtualCards" 
            onClick={handleMenuClick}
          >
            My Virtual Cards
          </li>
        </ul>
      </div>
      {handleMenuSelection()}
    </div>

  );
}
