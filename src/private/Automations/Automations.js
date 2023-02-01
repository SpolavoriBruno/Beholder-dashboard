import React, { useEffect, useState } from "react"
import Pagination from "../../components/Pagination/Pagination"
import { usePage } from "../../hooks/navigation"
import { deleteAutomation, getAutomations, startAutomation, stopAutomation } from "../../services/AutomationService"
import { notify } from "../../components/Toast/Toast"
import AutomationModal from "./AutomationModal/AutomationModal"
import AutomationRow from "./AutomationRow"
import "./Automations.css"
import NewAutomationButton from "./NewAutomationButton"
import GridModal from "./GridModal/GridModal"

const DEFAULT_AUTOMATION = {
    name: '',
    indexes: '',
    conditions: '',
    symbol: 'ETHBTC',
    isActive: false,
    logs: false
}

function Automations() {
    const [count, setCount] = useState(1)
    const [automations, setAutomations] = useState([])
    const [editAutomations, setEditAutomations] = useState(DEFAULT_AUTOMATION)

    const [page] = usePage()

    const automationModals = [
        { id: 'modalAutomation', name: 'Regular' },
        { id: 'modalGrid', name: 'Grid' }
    ]

    function onEditClick(event) {
        const id = event.target.id.split('/')[1]
        setEditAutomations(automations.find(automation => automation.id == id))
    }
    function onStartClick(event) {
        const token = localStorage.getItem('token')
        const id = event.target.id.split('/')[1]

        startAutomation(id, token)
            .then(() => {
                const i = automations.findIndex(a => a.id == id)
                automations[i].isActive = true
                setAutomations([...automations])
            })
            .catch(error => {
                console.error(error)
                notify({ type: 'error', text: error.response ? error.response.data : error.message })
            })
    }
    function onStopClick(event) {
        const token = localStorage.getItem('token')
        const id = event.target.id.split('/')[1]

        stopAutomation(id, token)
            .then(() => {
                const i = automations.findIndex(a => a.id == id)
                automations[i].isActive = false
                setAutomations([...automations])
            })
            .catch(error => {
                console.error(error)
                notify({ type: 'error', text: error.response ? error.response.data : error.message })
            })
    }
    function onDeleteClick(event) {
        const token = localStorage.getItem('token')
        const id = event.target.id.split('/')[1]
        deleteAutomation(id, token)
            .then(() => {
                const i = automations.findIndex(a => a.id == id)
                automations.splice(i, 1)
                setAutomations([...automations])
            })
            .catch(error => {
                console.error(error)
                notify({ type: 'error', text: error.response ? error.response.data : error.message })
            })
    }
    function onModalSubmit(automation) {
        const i = automations.findIndex(m => m.id == automation.id)
        if (i > -1) {
            automations[i] = automation
            return setAutomations([...automations])
        }
        setCount(c => c + 1)
        setAutomations(prevState => [...prevState, automation])
        setEditAutomations(DEFAULT_AUTOMATION)
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
            }).catch(error => {
                console.error(error)
                notify({ type: 'error', text: error.response ? error.response.data : error.message })
            })
    }, [page])

    return (<main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <div className="d-block">
                <h2 className="h4 mb-0">Automations</h2>
            </div>
            <div className="btn-toolbar mb-2 mb-md-0 align-items-center">
                <div className="d-inline-flex align-items-center">
                    <NewAutomationButton onClick={newAutomationClick} data={automationModals} />
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
                    {automations.map(automation => (
                        <AutomationRow key={automation.id} data={automation} onEdit={onEditClick} onStart={onStartClick} onStop={onStopClick} onDelete={onDeleteClick} />
                    ))}
                </tbody>
            </table>
            <Pagination count={count} />
        </div>
        <AutomationModal data={editAutomations} onSubmit={onModalSubmit} />
        <GridModal data={editAutomations} onSubmit={onModalSubmit} />
    </main>)
}

export default Automations
