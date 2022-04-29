import React from "react"
import { getDate } from "../../utils/date.js"
/** 
 * Props:
 * - data
 * - onClick
 */
function OrderRow(props) {

    function getStatusClass(status) {
        switch (status.toLowerCase()) {
            case 'partially_filled':
                return 'text-info'
            case 'filled':
                return 'text-success'
            case 'rejected':
            case 'expired':
            case 'cancelled':
                return 'text-danger'
            case 'new':
                return 'text-warning'
            default:
                return ''
        }
    }

    return (<tr>
        <td>{props.data.symbol}</td>
        <td>
            <span className="fn-normal"> {getDate(props.data.transactTime)} </span>
        </td>
        <td><span className="fn-normal"> {props.data.side} </span></td>
        <td><span className="fn-normal"> {props.data.quantity} </span></td>
        <td><span className="fn-bold"> {props.data.net} </span></td>
        <td><span className={getStatusClass(props.data.status)}> {props.data.status} </span></td>
        <td>
            <button id={`view/${props.data.id}`} type="button" className="btn btn-xs btn-info" data-bs-toggle="modal" data-bs-target="#modalViewOrder" onClick={props.onClick}>
                <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </button>
        </td>


    </tr>)
}

export default OrderRow
