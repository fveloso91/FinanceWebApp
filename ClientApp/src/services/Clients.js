import axios from 'axios';

export const getClientById = async (id) => {

    return await axios.get(`v1/clients/${id}`)
        .then(response => response.data)
        .catch(error => console.log(error));
}

export const createNewClient = async (name) => {
    
    return await axios.post(`v1/clients`, { name: name })
        .then(response => response.data)
        .catch(error => console.log(error));
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
}

export const setCurrentUser = (id, name) => {
    
    localStorage.setItem("user", JSON.stringify(
        { 
            id, 
            name 
        }
    ));
}