import axios from "./BaseService"

const API_URL = process.env.REACT_APP_API_URL
const AUTOMATIONS_URL = `${API_URL}/automations`

export async function getAutomations(page, token) {
    const url = `${AUTOMATIONS_URL}?page=${page}`
    const headers = {
        'authorization': token
    }
    const response = await axios.get(url, { headers })

    return response.data
}

export async function saveAutomation(id, automation, token) {
    const headers = {
        'authorization': token
    }
    let response

    if (id)
        response = await axios.patch(`${AUTOMATIONS_URL}/${id}`, automation, { headers })
    else
        response = await axios.post(AUTOMATIONS_URL, automation, { headers })

    return response.data
}

export async function startAutomation(id, token) {
    const headers = {
        'authorization': token
    }
    const response = await axios.post(`${AUTOMATIONS_URL}/${id}/start`, {}, { headers })

    return response.data
}

export async function stopAutomation(id, token) {
    const headers = {
        'authorization': token
    }
    const response = await axios.post(`${AUTOMATIONS_URL}/${id}/stop`, {}, { headers })

    return response.data
}

export async function deleteAutomation(id, token) {
    const headers = {
        'authorization': token
    }
    const response = await axios.delete(`${AUTOMATIONS_URL}/${id}`, { headers })

    return response.data
}
