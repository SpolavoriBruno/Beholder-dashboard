import React, { useEffect, useState } from "react"

/** 
 * props:
 * - data
 * - onEdit
 * - onStop
 * - onStart
 * - onDelete
 */
function OrderTemplateRow(props) {
    const [orderTemplate, setOrderTemplate] = useState({})

    function getActiveClass(isActive) {
        return isActive ? 'badge bg-success' : 'badge bg-danger'
    }

    function getActiveText(isActive) {
        return isActive ? 'Running' : 'Stopped'
    }

    useEffect(() => {
        setOrderTemplate(props.data)
    }, [props.data])

    return (<tr>
        <td> {orderTemplate.symbol} </td>
        <td> {orderTemplate.name} </td>
        <td> {orderTemplate.side} </td>
        <td> {orderTemplate.type} </td>
        <td>
            <button
                className="btn btn-xs btn-tertiary ms-2"
                id={`edit/${orderTemplate.id}`}
                title="Edit OrderTemplate"
                onClick={props.onEdit}
                data-bs-toggle="modal"
                data-bs-target="#modalOrderTemplate"
            >
                <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <button
                className="btn btn-xs btn-danger ms-2"
                id={`delete/${orderTemplate.id}`}
                title="Delete OrderTemplate"
                onClick={props.onDelete}
            >
                <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </td>
    </tr>)
}

export default OrderTemplateRow
