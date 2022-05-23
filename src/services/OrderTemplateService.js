import axios from "./BaseService"

const API_URL = process.env.REACT_APP_API_URL
const ORDER_TEMPLATES_URL = `${API_URL}/ordertemplates`

export async function getOrderTemplates(symbol, page, token) {
    const url = `${ORDER_TEMPLATES_URL}/${symbol || ''}${page ? `?page=${page}` : ''}`
    const headers = { 'authorization': token }
    const response = await axios.get(url, { headers })

    return response.data
}

export async function saveOrderTemplate(id, orderTemplate, token) {
    const headers = { 'authorization': token }
    let response

    if (id)
        response = await axios.patch(`${ORDER_TEMPLATES_URL}/${id}`, orderTemplate, { headers })
    else
        response = await axios.post(ORDER_TEMPLATES_URL, orderTemplate, { headers })

    return response.data
}

export async function deleteOrderTemplate(id, token) {
    const headers = { 'authorization': token }
    const response = await axios.delete(`${ORDER_TEMPLATES_URL}/${id}`, { headers })

    return response.data
}
