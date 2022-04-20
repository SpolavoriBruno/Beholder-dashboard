import React, { useMemo } from "react"

function OrderType(props) {
    return useMemo(() => (<div className="form-group">
        <label htmlFor="side">Type</label>
        <select className="form-select" id="type" defaultValue={props.type} onChange={props.onChange}>
            <option value="ICEBERG">Iceberg</option>
            <option value="LIMIT">Sell</option>
            <option value="MARKET">Buy</option>
            <option value="STOP_LOSS">Sell</option>
            <option value="STOP_LOSS_LIMIT">Buy</option>
            <option value="TAKE_PROFIT">Sell</option>
            <option value="TAKE_PROFIT_LIMIT">Buy</option>
        </select>

    </div>), [props.side, props.onChange])
}

export default OrderType
