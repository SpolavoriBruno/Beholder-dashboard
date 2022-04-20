import React, { useRef, useState } from "react"
import SelectSymbol from "./SelectSymbol"
import SymbolPrice from "./SymbolPrice"

function NewOrderModal() {
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
    const [order, setOrder] = useState(DEFAULT_ORDER)

    function onInputChange(event) {
        setOrder({ ...order, [event.target.id]: event.target.value })
    }

    function onSubmit(event) {
        console.log('onSubmit')
    }

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
