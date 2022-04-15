import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export async function getSymbols(token) {
    const url = `${API_URL}/symbols`;
    const headers = {
        'authorization': token
    }

    const response = await axios.get(url, { headers });
    return response.data;
}

export async function getSymbol(symbol, token) {
    const url = `${API_URL}/symbols/${symbol}`;
    const headers = {
        'authorization': token
    }
    const response = await axios.get(url, { headers });
    return response.data;
}

export async function updateSymbol(symbolData, token) {
    const url = `${API_URL}/symbols/${symbolData.symbol}`;
    const headers = {
        'authorization': token
    }
    const response = await axios.patch(url, symbolData, { headers });
    return response.data;
}

export async function syncSymbols(token) {
    const url = `${API_URL}/symbols/sync`;
    const headers = {
        'authorization': token
    }

    const response = await axios.post(url, {}, { headers });
    return response.data;
}
