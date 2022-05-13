import axios from "./BaseService"

const API_URL = process.env.REACT_APP_API_URL
const BEHOLDER_URL = `${API_URL}/beholder`

export async function getBeholderIndexes(symbol, token) {
    let url = `${BEHOLDER_URL}/memory/indexes`
    if (symbol) url += `?symbol=${symbol}`
    const headers = {
        'authorization': token
    }
    const response = await axios.get(url, { headers })

    return response.data
}
