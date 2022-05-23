import React, { useEffect, useRef, useState } from "react"
import { ORDER_TYPES, STOP_TYPES } from "../../../services/ExchangeService"
import OrderType from "../../../components/NewOrder/OrderType"
import SelectSide from "../../../components/NewOrder/SelectSide"
import SelectSymbol from "../../../components/SelectSymbol/SelectSymbol"
import { saveOrderTemplate } from "../../../services/OrderTemplateService"
import QuantityTemplate from "./QuantityTemplate"
import PriceTemplate from "./PriceTemplate"
import { getBeholderIndexes } from "../../../services/BeholderService"

export const DEFAULT_ORDER_TEMPLATE = {
    name: '',
    symbol: 'BTCBUSD',
    type: 'MARKET',
    side: 'BUY',
    quantity: '',
    quantityMultiplier: '1',
    limitPrice: '',
    limitPriceMultiplier: '1',
    stopPrice: '',
    stopPriceMultiplier: '1',
    icebergQty: '',
    icebergQtyMultiplier: '1',
}

/**
 * props:
 * - wallet
 * - onSubmit
 * - notify
 */
function OrderTemplateModal({ wallet, notify, onSubmit, data }) {
    const btnClose = useRef('')
    const btnSave = useRef('')

    const [orderTemplate, setOrderTemplate] = useState(DEFAULT_ORDER_TEMPLATE)
    const [indexes, setIndexes] = useState([])

    function onInputChange(event) {
        const { id, value } = event.target
        setOrderTemplate(prevState => ({ ...prevState, [id]: value }))
    }

    function getPriceClasses(orderTemplateType) {
        return orderTemplateType !== ORDER_TYPES.MARKET ? 'col-md-6' : 'col-md-6 d-none'
    }

    function getIcebergClasses(orderTemplateType) {
        return orderTemplateType === ORDER_TYPES.ICEBERG ? 'col-md-6' : 'col-md-6 d-none'
    }

    function getStopPriceClasses(orderTemplateType) {
        return STOP_TYPES.indexOf(orderTemplateType) !== -1 ? 'col-md-6' : 'col-md-6 d-none'
    }

    function onSave() {
        const token = localStorage.getItem('token')
        saveOrderTemplate(orderTemplate.id, orderTemplate, token)
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
        setOrderTemplate(data)
    }, [data])

    useEffect(() => {
        if (!orderTemplate || !orderTemplate.symbol) return
        const token = localStorage.getItem('token')

        getBeholderIndexes(orderTemplate.symbol, token)
            .then(function (result) {
                const indexRegex = /^(BOOK|LAST_CANDLE|LAST_ORDER.(avgPrice|stopPrice|limitPrice|net)|VWAP)/

                const filteredIndexes = result.filter(index =>
                    index.symbol === orderTemplate.symbol
                    && indexRegex.test(index.variable)
                )
                setIndexes(filteredIndexes)
            })
            .catch(error => { })
    }, [orderTemplate.symbol])

    return (
        <div className="modal fade" id="modalOrderTemplate" tabIndex="-1" role="dialog" aria-labelledby="modalOrderLabelTemplate" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="h5 modal-title" id="modalOrderLabelTemplate">{orderTemplate.id ? 'Edit' : 'New'} Template</h2>
                        <button type="button" ref={btnClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="form-group row align-items-center mb-4">
                                <div className="col-md-4">
                                    <SelectSymbol onChange={onInputChange} symbol={orderTemplate.symbol} label="Symbol" disabled={orderTemplate.id > 0} />
                                </div>
                                <div className="col-md-4">
                                    <SelectSide onChange={onInputChange} side={orderTemplate.side} />
                                </div>
                                <div className="col-md-4">
                                    <OrderType onChange={onInputChange} type={orderTemplate.type} />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Template Name" value={orderTemplate.name} onChange={onInputChange} />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <QuantityTemplate id="quantity" text="Quantity" quantity={orderTemplate.quantity} multiplier={orderTemplate.quantityMultiplier} onChange={onInputChange} />
                                </div>
                                <div className={getIcebergClasses(orderTemplate.type)}>
                                    <QuantityTemplate id="icebergQty" text="Iceberg Qty" quantity={orderTemplate.icebergQty} multiplier={orderTemplate.icebergQtyMultiplier} onChange={onInputChange} />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className={getPriceClasses(orderTemplate.type)}>
                                    <PriceTemplate id="limitPrice" text="Unit Price" indexes={indexes} price={orderTemplate.limitPrice} multiplier={orderTemplate.limitPriceMultiplier} onChange={onInputChange} />
                                </div>
                                <div className={getStopPriceClasses(orderTemplate.type)}>
                                    <PriceTemplate id="stopPrice" text="Stop Price" indexes={indexes} price={orderTemplate.stopPrice} multiplier={orderTemplate.stopPriceMultiplier} onChange={onInputChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" ref={btnSave} className="btn btn-sm btn-primary" onClick={onSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderTemplateModal
