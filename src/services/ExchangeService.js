import axios from "./BaseService"

const API_URL = process.env.REACT_APP_API_URL

export const STOP_TYPES = ["STOP_LOSS", "STOP_LOSS_LIMIT", "TAKE_PROFIT", "TAKE_PROFIT_LIMIT"]

export const ORDER_SIDE = {
    BUY: "BUY",
    SELL: "SELL"
}

export const ORDER_TYPES = {
    ICEBERG: "ICEBERG",
    MARKET: "MARKET",
    LIMIT: "LIMIT",
    STOP: "STOP",
    STOP_LIMIT: "STOP_LIMIT",
    TAKE_PROFIT: "TAKE_PROFIT",
    TAKE_PROFIT_LIMIT: "TAKE_PROFIT_LIMIT"
}

export async function getBalance(token) {
    const balanceUrl = `${API_URL}/exchange/balance`
    const headers = {
        'authorization': token
    }
    const response = await axios.get(balanceUrl, { headers })

    return Object.entries(response.data).map(item => {
        return {
            symbol: item[0],
            available: item[1].available,
            onOrder: item[1].onOrder,
        }
    })
}

