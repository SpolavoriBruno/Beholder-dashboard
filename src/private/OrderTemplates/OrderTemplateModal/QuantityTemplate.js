import React, { useEffect, useRef, useState } from "react"

/**
 * props
 * - id
 * - text
 * - quantity
 * - multiplier
 * - onChange
 */
function QuantityTemplate({ id, text, quantity, multiplier, onChange }) {
    const quantityRef = useRef('')

    useEffect(() => {
        if (!quantity) return
        if (quantity === "WALLET") quantityRef.current.value = "Wallet"
        else if (quantity === "MIN_NOTIONAL") quantityRef.current.value = "Min. Notional"
        else quantityRef.current.value = quantity
    }, [quantity])

    return (<div className="form-group">
        <label htmlFor={id}>
            {text}
            <span className="badge bg-info" data-bs-toggle="tooltip" tada-bd-placement="top" title="'Wallet' Burn the Wallet | 'Min. Notional' Minimum trade allowed | Multiplier 1=100% ">?</span>
        </label>
        <div className="input-group">
            <input ref={quantityRef} type='text' list="qtyOptions" className="form-control w-50" id={id} onChange={onChange} />
            <span className="input-group-text bg-secondary">X</span>
            <input type='number' className="form-control" id={`${id}Multiplier`} value={multiplier} onChange={onChange} />
            <datalist id="qtyOptions">
                <option value="WALLET">Wallet</option>
                <option value="MIN_NOTIONAL">Min. Notional</option>
            </datalist>
        </div>
    </div>)
}

export default QuantityTemplate
