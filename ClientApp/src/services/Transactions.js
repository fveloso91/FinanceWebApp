import axios from 'axios';

export const createTransaction = async (data) => {
    return await axios.post("v1/transactions", data)
        .then(response => response)
        .catch(error => error.response);
}

export const getTransactionByClient = async (id) => {
    return await axios.get(`v1/transactions/client/${id}`)
        .then(response => response.data)
        .catch(error => console.log(error));
}