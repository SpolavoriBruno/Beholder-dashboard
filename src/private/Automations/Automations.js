import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Pagination from "../../components/Pagination/Pagination"
import { usePage } from "../../hooks/navigation"
import { deleteAutomation, getAutomations, startAutomation, stopAutomation } from "../../services/AutomationService"
import AutomationModal from "./AutomationModal/AutomationModal"
import AutomationRow from "./AutomationRow"
import "./Automations.css"

const DEFAULT_AUTOMATION = {
    name: '',
    indexes: '',
    conditions: '',
    isActive: false,
    logs: false
}

function Automations() {
    const history = useHistory()

    const [count, setCount] = useState(1)
    const [automations, setAutomations] = useState([])
    const [editAutomations, setEditAutomations] = useState(DEFAULT_AUTOMATION)

    const [page] = usePage()

    function onEditClick(event) {
        const id = event.target.id.split("/")[1]
        setEditAutomations(automations.find(automation => automation.id == id))
    }
    function onStartClick(event) {
        const token = localStorage.getItem('token')
        startAutomation(event.target.id.split('/')[1], token)
            .then(() => { history.go(0) })
            .catch(console.error)
    }
    function onStopClick(event) {
        const token = localStorage.getItem('token')
        stopAutomation(event.target.id.split('/')[1], token)
            .then(() => { history.go(0) })
            .catch(console.error)
    }
    function onDeleteClick(event) {
        const token = localStorage.getItem('token')
        deleteAutomation(event.target.id.split('/')[1], token)
            .then(() => { history.go(0) })
            .catch(console.error)
    }
    function onModalSubmit(automation) {
        setAutomations(prevState => {
            const i = prevState.findIndex(m => m.id == automation.id)
            if (i > -1) {
                prevState[i] = automation

                // TODO: update specific automation in JSX
                history.go(0)
                return prevState
            }
            setCount(c => c + 1)
            return [...prevState, automation]
        })
    }

    function newAutomationClick() {
        setEditAutomations(DEFAULT_AUTOMATION)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        getAutomations(page, token)
            .then(result => {
                setAutomations(result.rows)
                setCount(result.count)
            }).catch(console.error)
    }, [page])

    return (<main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <div className="d-block">
                <h2 className="h4 mb-0">Automations</h2>
            </div>
            <div className="btn-toolbar mb-2 mb-md-0 align-items-center">
                <div className="d-inline-flex align-items-center">
                    <button className="btn btn-primary animate-up-2" id="btnNewAutomation" onClick={newAutomationClick} data-bs-toggle="modal" data-bs-target="#modalAutomation">
                        <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="3 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                        </svg>
                        New Automation
                    </button>
                </div>
            </div>
        </div>
        <div className="card card-body border-0 shadow table-wraper table-responsive">
            <table className="table table-hover table-sm">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        automations.map(automation => (
                            <AutomationRow key={automation.id} data={automation} onEdit={onEditClick} onStart={onStartClick} onStop={onStopClick} onDelete={onDeleteClick} />
                        ))
                    }
                </tbody>
            </table>
            <Pagination count={count} />
        </div>
        <AutomationModal data={editAutomations} onSubmit={onModalSubmit} />
    </main>)
}

export default Automations
