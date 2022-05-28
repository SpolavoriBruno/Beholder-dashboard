import axios from "./BaseService"
import { STOP_TYPES } from "./ExchangeService"
const API_URL = process.env.REACT_APP_API_URL
const ORDERS_URL = `${API_URL}/orders/`

export async function getOrders(symbol, page, token) {
    const ordersUrl = `${ORDERS_URL}${symbol}?page=${page}`
    const headers = {
        'authorization': token
    }

    const response = await axios.get(ordersUrl, { headers })

    return response.data
}

export async function cancelOrder(symbol, orderId, token) {
    const ordersUrl = `${ORDERS_URL}${symbol}/${orderId}`
    const headers = {
        'authorization': token
    }

    const response = await axios.delete(ordersUrl, { headers })

    return response.data
}

export async function placeOrder(order, token) {
    const ordersUrl = `${ORDERS_URL}`
    const headers = {
        'authorization': token
    }

    const postOrder = {
        symbol: order.symbol.toUpperCase(),
        quantity: order.quantity,
        side: order.side.toUpperCase(),
        type: order.type.toUpperCase(),
    }

    if (order.type !== 'MARKET') postOrder.price = order.price;
    else if (order.type === 'ICEBERG') postOrder.options = { icebergQuantity: order.icebergQty };
    else if (STOP_TYPES.indexOf(order.type) !== -1)
        postOrder.options = { stopPrice: order.stopPrice, type: order.type.toUpperCase() };

    const response = await axios.post(ordersUrl, postOrder, { headers })

    return response.data
}

export async function syncOrder(beholderOrderId, token) {
    const ordersUrl = `${ORDERS_URL}sync/${beholderOrderId}`
    const headers = {
        'authorization': token
    }

    const response = await axios.post(ordersUrl, null, { headers })

    return response.data
}

function getThirtyDaysAgo() {
    const date = new Date()
    date.setUTCDate(date.getUTCDate() - 30)
    date.setUTCHours(0, 0, 0, 0)
    return date.getTime()
}

function getToday() {
    const date = new Date()
    date.setUTCHours(23, 59, 59, 999)
    return date.getTime()
}

function getStartToday() {
    const date = new Date()
    date.setUTCHours(0, 0, 0, 0)
    return date.getTime()
}

export async function getOrdersReport(quote, startDate, endDate, token) {
    startDate = startDate ? startDate.getTime() : getThirtyDaysAgo()
    endDate = endDate ? endDate.getTime() : getToday()

    const url = `${ORDERS_URL}reports/${quote}?startDate=${startDate}&endDate=${endDate}`
    const headers = {
        'authorization': token
    }

    const response = await axios.get(url, { headers })
    return response.data
}

export async function getDayTradeReport(quote, date, token) {
    date = date ? date.getTime() : getStartToday()

    const url = `${ORDERS_URL}reports/${quote}?date=${date}`
    const headers = {
        'authorization': token
    }

    const response = await axios.get(url, { headers })
    return response.data
}
