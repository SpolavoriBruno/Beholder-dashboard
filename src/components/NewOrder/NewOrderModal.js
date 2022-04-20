import React, { useEffect, useRef, useState } from "react"
import { getSymbol } from "../../services/SymbolService"
import OrderType from "./OrderType"
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
        size: 'BUY',
        type: 'LIMIT',
    }

    const btnClose = useRef('')
    const btnSend = useRef('')

    const [error, setError] = useState('')
    const [symbol, setSymbol] = useState({})
    const [order, setOrder] = useState(DEFAULT_ORDER)

    function onInputChange(event) {
        setOrder({ ...order, [event.target.id]: event.target.value })
    }

    function onSubmit(event) {
        console.log('onSubmit')
    }

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
                            <div className="form-group row align-items-center">
                                <div className="col-md-6">
                                    <SelectSymbol onChange={onInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <SymbolPrice symbol={order.symbol} />
                                </div>
                            </div>
                            <WalletSumary wallet={props.wallet} symbol={symbol} />
                            <div className="row">
                                <div className="col-md-6">
                                    <SelectSide onChange={onInputChange} side={order.size} />
                                </div>
                                <div className="col-md-6">
                                    <OrderType onChange={onInputChange} type={order.type} />
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
