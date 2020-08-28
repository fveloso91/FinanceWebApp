import axios from 'axios';

export const createCard = async (data) => {

    return await axios.post("v1/cards", data)
        .then(response => {
            alert(response.statusText);
            alert(response.status);
            return response.data;
        })
        .catch(error => console.log(error));
}

export const getCardsByClient = async (id) => {
    return await axios.get(`v1/cards/client/${id}`)
        .then(response => response.data)
        .catch(error => console.log(error));
}

export const getCardById = async (id) => {
    return await axios.get(`v1/cards/${id}`)
        .then(response => response.data)
        .catch(error => console.log(error));
}

export const removeCardById = async (id) => {
    return await axios.delete(`v1/cards/${id}`)
        .then(response => response.data)
        .catch(error => console.log(error));
}

export const editCardInfo = async (data, id) => {
    return await axios.patch(`v1/cards/${id}`, data)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
}