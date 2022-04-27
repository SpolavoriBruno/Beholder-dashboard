import React, { useMemo } from "react"

function OrderType(props) {
    return useMemo(() => (<div className="form-group">
        <label htmlFor="type">Type</label>
        <select className="form-select" id="type" defaultValue={props.type} onChange={props.onChange}>
            <option value="ICEBERG">Iceberg</option>
            <option value="LIMIT">Limit</option>
            <option value="MARKET">Maket</option>
            <option value="STOP_LOSS">Stop Loss</option>
            <option value="STOP_LOSS_LIMIT">Stop Loss Limit</option>
            <option value="TAKE_PROFIT">Take Profit</option>
            <option value="TAKE_PROFIT_LIMIT">Take Profit Limit</option>
        </select>

    </div>), [props.type, props.onChange])
}

export default OrderType
