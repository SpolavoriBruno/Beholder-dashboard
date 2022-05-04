import React, { useEffect, useMemo, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import Pagination from "../../components/Pagination/Pagination"
import { deleteMonitor, getMonitors, startMonitor, stopMonitor } from "../../services/MonitorService"
import MonitorModal from "./MonitorModal"
import MonitorRow from "./MonitorRow"
import { ORDER_TYPE } from '../../utils/exchange'

function Monitors() {
    const history = useHistory()
    const defaultLocation = useLocation()

    const [count, setCount] = useState(1)
    const [page, setPage] = useState(getPage())
    const [monitors, setMonitors] = useState([])
    const [editMonitors, setEditMonitors] = useState({
        type: ORDER_TYPE.CANDLES,
        interval: '1m',
        isActive: false,
        logs: false
    })

    function getPage(location) {
        if (!location) location = defaultLocation
        return new URLSearchParams(location.search).get("page") || 1
    }

    function onEditClick(event) {
        const id = event.target.id.split("/")[1]
        setEditMonitors(monitors.find(monitor => monitor.id == id))
    }
    function onStartClick(event) {
        const token = localStorage.getItem('token')
        startMonitor(event.target.id.split('/')[1], token)
            .then(() => { history.go(0) })
            .catch(console.error)
    }
    function onStopClick(event) {
        const token = localStorage.getItem('token')
        stopMonitor(event.target.id.split('/')[1], token)
            .then(() => { history.go(0) })
            .catch(console.error)
    }
    function onDeleteClick(event) {
        const token = localStorage.getItem('token')
        deleteMonitor(event.target.id.split('/')[1], token)
            .then(() => { history.go(0) })
            .catch(console.error)
    }
    function onModalSubmit(monitor) {
        setMonitors(prevState => {
            const i = prevState.findIndex(m => m.id == monitor.id)
            if (i > -1) {
                prevState[i] = monitor

                // TODO: update specific monitor in JSX
                history.go(0)
                return prevState
            }
            setCount(c => c + 1)
            return [...prevState, monitor]
        })
    }

    useEffect(() => {
        return history.listen(location => {
            setPage(getPage(location))
        })
    }, [history])

    useEffect(() => {
        const token = localStorage.getItem("token")
        getMonitors(page, token)
            .then(result => {
                setMonitors(result.rows)
                setCount(result.count)
            }).catch(console.error)
    }, [page])

    return (<main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <div className="d-block">
                <h2 className="h4 mb-0">Monitors</h2>
            </div>
            <div className="btn-toolbar mb-2 mb-md-0 align-items-center">
                <div className="d-inline-flex align-items-center">
                    <button className="btn btn-primary animate-up-2" id="btnNewMonitor" data-bs-toggle="modal" data-bs-target="#modalMonitor">
                        <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="3 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                        </svg>
                        New Monitor
                    </button>
                </div>
            </div>
        </div>
        <div className="card card-body border-0 shadow table-wraper table-responsive">
            <table className="table table-hover table-sm">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Symbol</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        monitors.map(monitor => (
                            <MonitorRow key={monitor.id} data={monitor} onEdit={onEditClick} onStart={onStartClick} onStop={onStopClick} onDelete={onDeleteClick} />
                        ))
                    }
                </tbody>
            </table>
            <Pagination count={count} page={page} />
        </div>
        <MonitorModal data={editMonitors} onSubmit={onModalSubmit} />
    </main>)
}

export default Monitors
