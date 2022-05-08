import axios from "./BaseService"

const API_URL = process.env.REACT_APP_API_URL
const MONITORS_URL = `${API_URL}/monitors`
let monitorTypes = []

export async function getMonitors(page, token) {
    const url = `${MONITORS_URL}?page=${page}`
    const headers = {
        'authorization': token
    }
    const response = await axios.get(url, { headers })

    return response.data
}

export async function getMonitorTypes(token) {
    if (monitorTypes.length > 0) return monitorTypes

    const url = `${MONITORS_URL}/types`
    const headers = {
        'authorization': token
    }
    let response = await axios.get(url, { headers })

    monitorTypes = response.data

    monitorTypes.getDefault = () => (monitorTypes.find(type => type.default))
    monitorTypes.getList = () => (monitorTypes.map(type => type.name))
    monitorTypes.getObject = () => (monitorTypes.reduce((acc, obj) => ({ ...acc, [obj.type]: obj.type }), {}))

    return monitorTypes
}

export async function saveMonitor(id, monitor, token) {
    const headers = {
        'authorization': token
    }
    let response

    if (id)
        response = await axios.patch(`${MONITORS_URL}/${id}`, monitor, { headers })
    else
        response = await axios.post(MONITORS_URL, monitor, { headers })

    return response.data
}

export async function startMonitor(id, token) {
    const headers = {
        'authorization': token
    }
    const response = await axios.post(`${MONITORS_URL}/${id}/start`, {}, { headers })

    return response.data
}

export async function stopMonitor(id, token) {
    const headers = {
        'authorization': token
    }
    const response = await axios.post(`${MONITORS_URL}/${id}/stop`, {}, { headers })

    return response.data
}

export async function deleteMonitor(id, token) {
    const headers = {
        'authorization': token
    }
    const response = await axios.delete(`${MONITORS_URL}/${id}`, { headers })

    return response.data
}
