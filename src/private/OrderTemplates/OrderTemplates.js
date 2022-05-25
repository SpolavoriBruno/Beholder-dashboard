import React, { useEffect, useState } from "react"
import Pagination from "../../components/Pagination/Pagination"
import { usePage } from "../../hooks/navigation"
import { deleteOrderTemplate, getOrderTemplates } from "../../services/OrderTemplateService.js"
import { notify } from "../../components/Toast/Toast"
import OrderTemplateModal, { DEFAULT_ORDER_TEMPLATE } from "./OrderTemplateModal/OrderTemplateModal"
import OrderTemplateRow from "./OrderTemplateRow.js"
import SearchSymbol from "../../components/SearchSymbol/SearchSymbol"


function OrderTemplates() {
    const [count, setCount] = useState(1)
    const [orderTemplates, setOrderTemplates] = useState([])
    const [editOrderTemplate, setEditOrderTemplate] = useState(DEFAULT_ORDER_TEMPLATE)
    const [search, setSearch] = useState('')

    const [page] = usePage()

    function onSearch(event) {
        setSearch(event.target.value)
    }

    function onEditClick(event) {
        const id = event.target.id.split('/')[1]
        setEditOrderTemplate(orderTemplates.find(orderTemplate => orderTemplate.id == id))
    }

    function onDeleteClick(event) {
        const token = localStorage.getItem('token')
        const id = event.target.id.split('/')[1]
        deleteOrderTemplate(id, token)
            .then(() => {
                const i = orderTemplates.findIndex(a => a.id == id)
                orderTemplates.splice(i, 1)
                setOrderTemplates([...orderTemplates])
            })
            .catch(error => {
                console.error(error)
                notify({ type: 'error', text: error.response ? error.response.data : error.message })
            })
    }

    function onModalSubmit(orderTemplate) {
        const i = orderTemplates?.findIndex(m => m.id == orderTemplate.id)
        if (i > -1) {
            orderTemplates[i] = orderTemplate
            return setOrderTemplates([...orderTemplates])
        }
        setCount(c => c + 1)
        setOrderTemplates(prevState => [...prevState, orderTemplate])
        setEditOrderTemplate(DEFAULT_ORDER_TEMPLATE)
    }

    function newOrderTemplateClick() {
        setEditOrderTemplate(DEFAULT_ORDER_TEMPLATE)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        getOrderTemplates(search, page, token)
            .then(result => {
                setOrderTemplates(result.rows)
                setCount(result.count)
            }).catch(error => {
                console.error(error)
                notify({ type: 'error', text: error.response ? error.response.data : error.message })
            })
    }, [page, search])

    return (<main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <div className="d-block">
                <h2 className="h4 mb-0">Order Templates</h2>
            </div>
            <div className="btn-toolbar mb-2 mb-md-0 align-items-center">
                <div className="d-inline-flex align-items-center">
                    <button className="btn btn-primary animate-up-2" id="btnNewOrderTemplate" onClick={newOrderTemplateClick} data-bs-toggle="modal" data-bs-target="#modalOrderTemplate">
                        <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                        New Template
                    </button>
                    <div className="btn-group ms-2">
                        <SearchSymbol onChange={onSearch} />
                    </div>
                </div>
            </div>
        </div>
        <div className="card card-body border-0 shadow table-wraper table-responsive">
            <table className="table table-hover table-sm">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Side</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orderTemplates && orderTemplates.map(orderTemplate => (
                        <OrderTemplateRow key={orderTemplate.id} data={orderTemplate} onEdit={onEditClick} onDelete={onDeleteClick} />
                    ))}
                </tbody>
            </table>
            <Pagination count={count} />
        </div>
        <OrderTemplateModal data={editOrderTemplate} onSubmit={onModalSubmit} />
    </main>)
}

export default OrderTemplates
