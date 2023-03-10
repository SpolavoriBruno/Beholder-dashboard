import React, { useEffect, useRef, useState } from "react"
import { getSymbol } from "../../services/SymbolService"
import { ORDER_SIDE, ORDER_TYPES, STOP_TYPES } from "../../services/ExchangeService"
import OrderType from "./OrderType"
import QuantityInput from "./QuantityInput"
import SelectSide from "./SelectSide"
import SelectSymbol from "../SelectSymbol/SelectSymbol"
import SymbolPrice from "../SimbolPrice/SymbolPrice"
import WalletSumary from "../WalletSumary/WalletSumary"
import { placeOrder } from "../../services/OrdersService"
import { notify } from "../Toast/Toast"

/**
 * props:
 * - onSubmit
 */
function NewOrderModal({ onSubmit }) {
    const DEFAULT_ORDER = {
        symbol: 'BTCUSTD',
        price: 0,
        stopPrice: 0,
        quantity: 0,
        icebergQty: 0,
        side: ORDER_SIDE.BUY,
        type: ORDER_TYPES.MARKET,
    }

    const btnClose = useRef('')
    const btnSend = useRef('')
    const inputTotal = useRef('')

    const [symbol, setSymbol] = useState({})
    const [book, setBook] = useState({ ask: 0, bid: 0 })
    const [order, setOrder] = useState(DEFAULT_ORDER)
    const [wallet, setWallet] = useState({})
    const [isVisible, setIsVisible] = useState(false)

    function onInputChange(event) {
        order[event.target.id] = event.target.value
        setOrder(order)
    }

    function onPriceChange(newBook) {
        setBook(newBook)
    }

    function getOrderClasses(orderType) {
        return orderType === ORDER_TYPES.MARKET ? 'col-md-6 d-none' : 'col-md-6'
    }

    function getIcebergClasses(orderType) {
        return orderType !== ORDER_TYPES.ICEBERG ? 'col-md-6 d-none' : 'col-md-6'
    }

    function getStopPriceClasses(orderType) {
        return STOP_TYPES.indexOf(orderType) === -1 ? 'col-md-6 d-none' : 'col-md-6'
    }

    function onSave() {
        const token = localStorage.getItem('token')
        placeOrder(order, token)
            .then(result => {
                btnClose.current.click()
                onSubmit && onSubmit(result)
            })
            .catch(error => {
                notify({ type: 'error', text: error.response ? error.response.data : error.message })
                console.error(error)
            })
    }

    useEffect(() => {
        btnSend.current.disabled = false

        if (!symbol || !order.quantity) return
        const quantity = parseFloat(order.quantity) || parseFloat(symbol.minLotSize)

        if (quantity < parseFloat(symbol.minLotSize)) {
            btnSend.current.disabled = true
            return notify({ type: 'error', text: 'Quantity must be greater than ' + symbol.minLotSize })
        }

        if (order.type === ORDER_TYPES.ICEBERG) {
            const icebergQty = parseFloat(order.icebergQty) || 0

            if (icebergQty && icebergQty < parseFloat(symbol.minLotSize)) {
                btnSend.current.disabled = true
                return notify({ type: 'error', text: 'Quantity(I) must be greater than ' + symbol.minLotSize })
            }
        }

        const minNotional = parseFloat(symbol.minNotional) || 0.01
        let total = 0

        if (order.type === ORDER_TYPES.MARKET) {
            if (order.side === ORDER_SIDE.BUY) {
                total = quantity * book.ask
            } else {
                total = quantity * book.bid
            }
        } else {
            const price = parseFloat(order.price) || 0
            total = price * quantity
        }

        if (inputTotal.current)
            inputTotal.current.value = total.toFixed(8)

        if (total < minNotional) {
            btnSend.current.disabled = true
            return notify({ type: 'error', text: 'Min Notional must be greater than ' + minNotional })
        }
    }, [order.quantity, order.price, order.icebergQty, order.type, order.side])

    useEffect(() => {
        if (!order.symbol) return
        const token = localStorage.getItem('token')
        getSymbol(order.symbol, token)
            .then(symbolObject => setSymbol(symbolObject))
            .catch(error => {
                notify({ type: 'error', text: error.response ? error.response.data : error.message })
                console.error(error)
            })
    }, [order.symbol])

    useEffect(() => {
        const modal = document.getElementById('modalOrder')

        modal.addEventListener('hidden.bs.modal', event => {
            setIsVisible(false)
        })
        modal.addEventListener('show.bs.modal', event => {
            setIsVisible(true)
        })
    }, [])
    return (
        <div className="modal fade" id="modalOrder" tabIndex="-1" role="dialog" aria-labelledby="modalOrderLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="h5 modal-title" id="modalOrderLabel">New Order</h2>
                        <button type="button" ref={btnClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        {isVisible &&
                            <div className="container">
                                <div className="form-group row align-items-center mb-4">
                                    <div className="col-md-6">
                                        <SelectSymbol onChange={onInputChange} label="Symbol" />
                                    </div>
                                    <div className="col-md-6">
                                        <SymbolPrice symbol={order.symbol} onChange={onPriceChange} />
                                    </div>
                                </div>
                                <WalletSumary symbol={symbol} onChange={setWallet} />
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
                                        <QuantityInput id="quantity" text="Quantity" symbol={symbol} wallet={wallet} price={order.price} side={order.side} onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className={getIcebergClasses(order.type)}>
                                        <QuantityInput id="icebergQty" text="Iceberg Quantity" symbol={symbol} wallet={wallet} price={order.price} side={order.side} onChange={onInputChange} />
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
                            </div>}
                    </div>
                    <div className="modal-footer">
                        <button type="button" ref={btnSend} className="btn btn-sm btn-primary" onClick={onSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewOrderModal
