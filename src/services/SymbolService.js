import axios from 'axios'

const SYMBOLS_URL = `${process.env.REACT_APP_API_URL}/symbols/`

export async function getSymbols(token) {
    const headers = {
        'authorization': token
    }

    const response = await axios.get(SYMBOLS_URL, { headers })
    return response.data
}

export async function getSymbol(symbol, token) {
    const url = `${SYMBOLS_URL}${symbol}`
    const headers = {
        'authorization': token
    }
    const response = await axios.get(url, { headers })
    return response.data
}

export async function searchSymbols({ search, onlyFavorites, page = 1 }, token) {
    const params = []
    search && params.push(`search=${search}`)
    onlyFavorites && params.push(`onlyFavorites=${onlyFavorites}`)
    page && params.push(`page=${page}`)

    const url = `${SYMBOLS_URL}?${params.join('&')}`
    const headers = {
        'authorization': token
    }
    const response = await axios.get(url, { headers })
    return response.data
}

export async function updateSymbol(symbolData, token) {
    const url = `${SYMBOLS_URL}${symbolData.symbol}`
    const headers = {
        'authorization': token
    }
    const response = await axios.patch(url, symbolData, { headers })
    return response.data
}

export async function syncSymbols(token) {
    const url = `${SYMBOLS_URL}sync`
    const headers = {
        'authorization': token
    }

    const response = await axios.post(url, {}, { headers })
    return response.data
}
