import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { ORDER_STATUS } from '../../utils/exchange'
import { getDate } from "../../utils/date.js"
import { cancelOrder } from "../../services/OrdersService"

/** 
 * props:
 * - data
 * - onCancel
 */
function ViewOrderModal(props) {
    const history = useHistory()
    const btnClose = useRef('')
    const btnCancel = useRef('')

    const [error, setError] = useState('')
    const [order, setOrder] = useState({
        symbol: ''
    })

    function getStatusClass(status) {
        switch (status) {
            case ORDER_STATUS.PARTIALLY_FILLED:
                return 'badge bg-info'
            case ORDER_STATUS.FILLED:
                return 'badge bg-success'
            case ORDER_STATUS.NEW:
                return 'badge bg-warning'
            case ORDER_STATUS.CANCELED:
            case ORDER_STATUS.REJECTED:
            case ORDER_STATUS.EXPIRED:
                return 'badge bg-danger'
            default:
                return 'badge bg-prymary'
        }
    }

    function onCancelClick(event) {
        const token = localStorage.getItem('token')

        cancelOrder(order.symbol, order.orderId, token)
            .then(result => {
                btnClose.current.click()
                props.onCancel && props.onCancel({ target: { id: 'order', value: order.orderId } })
                return history.push(`/orders/${order.symbol}`)
            })
            // TODO: handle error
            .catch(console.error)
    }

    useEffect(() => {
        if (props.data) {
            setOrder(props.data)

            btnCancel.current.disabled = props.data.status !== ORDER_STATUS.NEW
        }
    }, [props.data])

    return (
        <div className="modal fade" id="modalViewOrder" tabIndex="-1" role="dialog" aria-labelledby="modalOrderLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="h5">Order Details</h4>
                        <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <b>Symbol:</b> {order.symbol}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <span className={getStatusClass(order.status)}>
                                        {order.status}
                                    </span>
                                    {
                                        order.isMaker &&
                                        <span className="badge bg-warning mx-2" title="Maker">M</span>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <b>Beholder Id:</b> {order.id}
                                </div>
                                {
                                    order.automationId &&
                                    <div className="col-md-6 mb-3">
                                        <p>Automation Id:</p> {order.automationId}
                                    </div>
                                }
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <b>Binance Ids:</b> {order.orderId} / {order.clientOrderId}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <b>Side:</b> {order.side}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <b>Type:</b> {order.type}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <b>Quantity:</b> {order.quantity}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <b>Unit Price:</b> {order.limitPrice}
                                </div>
                            </div>
                            <div className="row">
                                {
                                    order.icebergQuantity &&
                                    <div className="col-md-6 mb-3">
                                        <b>Iceberg Qty:</b> {order.icebergQuantity}
                                    </div>
                                }
                                {
                                    order.stopPrice &&
                                    <div className="col-md-6 mb-3">
                                        <b>Stop Price:</b> {order.stopPrice}
                                    </div>
                                }
                                <div className="col-md-6 mb-3">
                                    <b>Avg Price:</b> {order.avgPrice}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <b>Date:</b> {getDate(order.transactTime)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <b>Comission:</b> {order.commision}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <b>Net:</b> {order.net}
                                </div>
                            </div>
                            {
                                order.obs &&
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <b>Obs:</b> {order.obs}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        {
                            error &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }
                        <button ref={btnCancel} type="button" className="btn btn-danger btn-sm" onClick={onCancelClick}>
                            <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="3 2 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewOrderModal