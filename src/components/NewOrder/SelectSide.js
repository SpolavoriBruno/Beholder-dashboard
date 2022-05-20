import React, { useMemo } from "react"

function SelectSide(props) {
    return useMemo(() => (<div className="form-group">
        <label htmlFor="side">Side</label>
        <select className="form-select" id="side" value={props.side} onChange={props.onChange}>
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
        </select>

    </div>), [props.side, props.onChange])
}

export default SelectSide
