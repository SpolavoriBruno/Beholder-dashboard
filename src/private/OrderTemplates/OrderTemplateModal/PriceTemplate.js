import React, { useEffect, useRef } from "react"

/**
 * props
 * - id
 * - text
 * - indexes
 * - price
 * - multiplier
 * - onChange
 */
function PriceTemplate({ id, text, indexes, price, multiplier, onChange }) {
    const priceRef = useRef('')

    useEffect(() => {
        if (!price) return

        const i = indexes.map(i => i.eval).indexOf(price)

        if (i > -1) priceRef.current.value = indexes[i].variable
        else priceRef.current.value = price
    }, [price, indexes])

    return (<div className="form-group">
        <label htmlFor={id}>
            {text}
            <span className="badge bg-info" data-bs-toggle="tooltip" tada-bd-placement="top" title="Specify a price or select an Index | Multiplier 1=100%">?</span>
        </label>
        <div className="input-group">
            <input ref={priceRef} type='text' list="priceOptions" className="form-control w-50" id={id} onChange={onChange} />
            <span className="input-group-text bg-secondary">X</span>
            <input type='number' className="form-control" id={`${id}Multiplier`} value={multiplier} onChange={onChange} />
            <datalist id="priceOptions">
                {indexes && indexes.map(index =>
                    <option key={`${index.symbol}:${index.variable}`} value={index.eval}>{index.variable}</option>
                )}
            </datalist>
        </div>
    </div>)
}

export default PriceTemplate
