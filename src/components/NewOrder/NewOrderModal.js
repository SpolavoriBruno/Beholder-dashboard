import React, { useEffect, useRef, useState } from "react"
import { getSymbol } from "../../services/SymbolService"
import { STOP_TYPES } from "../../services/ExchangeService"
import OrderType from "./OrderType"
import QuantityInput from "./QuantityInput"
import SelectSide from "./SelectSide"
import SelectSymbol from "./SelectSymbol"
import SymbolPrice from "./SymbolPrice"
import WalletSumary from "./WalletSumary"

function NewOrderModal(props) {
    const DEFAULT_ORDER = {
        symbol: 'BTCUSTD',
        price: 0,
        stopPrice: 0,
        quantity: 0,
        icebergQty: 0,
        side: 'BUY',
        type: 'LIMIT',
    }

    const btnClose = useRef('')
    const btnSend = useRef('')
    const inputTotal = useRef('')

    const [error, setError] = useState('')
    const [symbol, setSymbol] = useState({})
    const [order, setOrder] = useState(DEFAULT_ORDER)

    function onInputChange(event) {
        setOrder({ ...order, [event.target.id]: event.target.value })
    }

    function getOrderClasses(orderType) {
        return orderType === "MARKET" ? 'col-md-6 d-none' : 'col-md-6'
    }

    function getIcebergClasses(orderType) {
        return orderType !== "ICEBERG" ? 'col-md-6 d-none' : 'col-md-6'
    }

    function getStopPriceClasses(orderType) {
        return STOP_TYPES.indexOf(orderType) === -1 ? 'col-md-6 d-none' : 'col-md-6'
    }


    function onSubmit(event) {
        console.log('onSubmit')
    }

    useEffect(() => {
        setError('')
        btnSend.current.disabled = false

        const quantity = parseFloat(order.quantity)

        if (quantity && quantity < parseFloat(symbol.minLotSize)) {
            btnSend.current.disabled = true
            return setError('Quantity must be greater than ' + symbol.minLotSize)
        }

        if (order.type === 'ICEBERG') {
            const icebergQty = parseFloat(order.icebergQty)

            if (icebergQty && icebergQty < parseFloat(symbol.minLotSize)) {
                btnSend.current.disabled = true
                return setError('Quantity(I) must be greater than ' + symbol.minLotSize)
            }
        }

        const price = parseFloat(order.price)
        if (!price) return

        const total = price * quantity
        inputTotal.current.value = total.toFixed(8)

        const minNotional = parseFloat(symbol.minNotional)
        if (total < minNotional) {
            btnSend.current.disabled = true
            return setError('Min Notional must be greater than ' + minNotional)
        }

    }, [order.quantity, order.price, order.icebergQty, order.type])

    useEffect(() => {
        if (!order.symbol) return
        const token = localStorage.getItem('token')
        getSymbol(order.symbol, token)
            .then(symbolObject => setSymbol(symbolObject))
            .catch(console.error)
    }, [order.symbol])

    return (
        <div className="modal fade" id="modalOrder" tabIndex="-1" role="dialog" aria-labelledby="modalOrderLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="h5 modal-title" id="modalOrderLabel">New Order</h2>
                        <button type="button" ref={btnClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="form-group row align-items-center mb-4">
                                <div className="col-md-6">
                                    <SelectSymbol onChange={onInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <SymbolPrice symbol={order.symbol} />
                                </div>
                            </div>
                            <WalletSumary wallet={props.wallet} symbol={symbol} />
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <SelectSide onChange={onInputChange} side={order.side} />
                                </div>
                                <div className="col-md-6">
                                    <OrderType onChange={onInputChange} type={order.type} />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className={getOrderClasses(order.type)}>
                                    <div className="form-group">
                                        <label htmlFor="price">Unit Price</label>
                                        <input type='number' className="form-control" id="price" placeholder={order.price} onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <QuantityInput id="quantity" text="Quantity" symbol={symbol} wallet={props.wallet} price={order.price} side={order.side} onChange={onInputChange} />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className={getIcebergClasses(order.type)}>
                                    <QuantityInput id="icebergQty" text="Iceberg Quantity" symbol={symbol} wallet={props.wallet} price={order.price} side={order.side} onChange={onInputChange} />
                                </div>
                                <div className={getStopPriceClasses(order.type)}>
                                    <label htmlFor="stopPrice">Stop Price</label>
                                    <input type='number' className="form-control" id="stopPrice" placeholder={order.stopPrice} onChange={onInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="stopPrice">Total Price</label>
                                    <input ref={inputTotal} type='number' className="form-control" id="total" placeholder="0" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {error &&
                            <div className="alert alert-danger mt-1 col-9 py-1" role="alert">{error}</div>
                        }
                        <button type="button" ref={btnSend} className="btn btn-sm btn-primary" onClick={onSubmit} data-bs-dismiss="modal">Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewOrderModal
