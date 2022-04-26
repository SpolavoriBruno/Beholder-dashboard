import React, { useState, useEffect, useMemo, useRef } from "react"
import { getSymbols } from "../../services/SymbolService"

const STAR_COLOR = '#ffc107'

/**
 * props:
 * - id
 * - text
 * - wallet
 * - price
 * - side
 * - symbol
 * - onChange
 */
function QuantityInput(props) {
    const inputQuantity = useRef('')


    function onAllInClick(event) {
        if (!props.wallet || !Array.isArray(props.wallet)) return
        let quantity

        if (props.side === 'SELL') {
            const baseAsset = props.wallet.find(w => w.symbol === props.symbol.base)

            quantity = parseFloat(baseAsset.available)

            console.log('sell', quantity, baseAsset)

            if (!baseAsset) return
        } else {

            const quoteAsset = props.wallet.find(w => w.symbol === props.symbol.quote)

            const quoteAmmount = parseFloat(quoteAsset.available)

            quantity = quoteAmmount / parseFloat(props.price)
            console.log('buy', quantity, quoteAsset)
            if (!quoteAsset) return
            if (!quoteAmmount) return
            if (!quantity) return

        }
        inputQuantity.current.value = `${quantity}`.substring(0, 8)

        if (props.onChange) {
            props.onChange({ target: { id: props.id, value: inputQuantity.current.value } })
        }
    }

    return useMemo(() => (
        <div className="form-group">
            <label htmlFor={props.id}>{props.text}</label>
            <div className="input-group">
                <button type="button" className="btn btn-secondary d-inline-flex align-items-center" onClick={onAllInClick}>
                    <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                    </svg>
                    {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> */}
                </button>
                <input type='number' id={props.id} className="form-control" ref={inputQuantity} onChange={props.onChange} placeholder={props.symbol?.minLotSize} />
            </div>
        </div>
    ), [props.wallet, props.price, props.symbol, props.side])

}

export default QuantityInput
