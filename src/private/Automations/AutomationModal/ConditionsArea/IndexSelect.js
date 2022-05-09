import React, { useEffect, useState } from "react"

/**
 * props
 * - indexes
 * - onChange
 */
function IndexSelect(props) {
    const [indexes, setIndexes] = useState([])

    function getOptionText(index) {
        return index.variable === "WALLET" ? `${index.symbol}:${index.variable}` : index.variable
    }

    useEffect(() => {
        if (props.indexes && Array.isArray(props.indexes)) {
            setIndexes(props.indexes)
            if (props.indexes.length > 0)
                props.onChange({ target: { id: 'eval', value: props.indexes[0].eval } })
        }
    }, [props.indexes])

    return (<div className="input-group input-group-merge">
        <span className="input-group-text bg-secondary">Index</span>
        <select id="eval" className="form-control" onChange={props.onChange}>
            {indexes && indexes.map(item => (
                <option key={`${item.symbol}:${item.variable}`} value={item.eval}>{getOptionText(item)}</option>
            ))}
        </select>
    </div>)
}

export default IndexSelect
