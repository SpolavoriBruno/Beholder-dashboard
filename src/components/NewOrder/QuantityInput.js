import React, { useMemo, useRef } from "react"
import { ORDER_SIDE } from "../../services/ExchangeService"

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

    function onAllInClick() {
        if (!props.wallet || !Array.isArray(props.wallet)) return
        let quantity

        if (props.side === ORDER_SIDE.SELL) {
            const baseAsset = props.wallet.find(w => w.symbol === props.symbol.base)

            if (!baseAsset) return
            quantity = parseFloat(baseAsset.available)
        } else {
            const quoteAsset = props.wallet.find(w => w.symbol === props.symbol.quote)

            const quoteAmmount = parseFloat(quoteAsset.available)

            quantity = quoteAmmount / parseFloat(props.price)
            if (!quoteAsset) return
            if (!quoteAmmount) return
            if (!quantity) return
        }
        inputQuantity.current.value = `${quantity}`.substring(0, 8)

        props.onChange && props.onChange({ target: { id: props.id, value: inputQuantity.current.value } })
    }

    return useMemo(() => (
        <div className="form-group">
            <label htmlFor={props.id}>{props.text}</label>
            <div className="input-group">
                <button type="button" className="btn btn-secondary d-inline-flex align-items-center" onClick={onAllInClick}>
                    <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                    </svg>
                </button>
                <input type='number' id={props.id} className="form-control" ref={inputQuantity} onChange={props.onChange} step={props.symbol?.minLotSize} placeholder={props.symbol?.minLotSize} />
            </div>
        </div>
    ), [props.wallet, props.price, props.symbol, props.side])

}

export default QuantityInput
