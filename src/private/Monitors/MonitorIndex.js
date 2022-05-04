import React, { useEffect, useRef, useState } from "react"
import IndexBadge from "../../components/IndexBadge/IndexBadge"
import { INDEX } from "../../utils/exchange"

/** 
 * props
 * - indexes
 * - onChange
 */
function MonitorIndexes(props) {
    const selectRef = useRef('')

    const [indexes, setIndexes] = useState([])

    function onAddClick(event) {
        const value = selectRef.current.value
        if (value !== '' && indexes.indexOf(value) === -1) {
            indexes.push(value)
            setIndexes(indexes)
            if (props.onChange)
                props.onChange({ target: { id: 'indexes', value: indexes.join(',') } })
        }

    }

    function onRemoveClick(event) {
        const id = event.target.id.split('/')[1]
        const pos = indexes.findIndex(index => index === id)
        indexes.splice(pos, 1)
        setIndexes(indexes)
        if (props.onChange)
            props.onChange({ target: { id: 'indexes', value: indexes.join(',') } })
    }

    useEffect(() => {
        if (!props.indexes) return
        setIndexes(props.indexes.split(","))
    }, [props.indexes])


    useEffect(() => {
        selectRef.current && (selectRef.current.value = props.indexes)
        props.onChange({ target: { id: 'indexes', value: props.indexes } })
    }, [props.indexes])

    return (
        <div className="form-group">
            <label htmlFor="indexes">Indexes</label>
            <div className="input-group">
                <select ref={selectRef} id="indexes" className="form-select">
                    <option value=""></option>
                    {
                        Object.entries(INDEX).map(index => {
                            const name = index[0].length > 4 ?
                                index[0].toLocaleLowerCase()
                                    .split("_")
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(" ")
                                : index[0]
                            return (<option key={index[1]} value={index[1]}>{name}</option>)
                        })
                    }
                </select>
                <button className="btn btn-sm btn-tertiary" onClick={onAddClick}>
                    <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
            <div className="d-inline-flex align-content-start mt-3">
                {
                    indexes.map(index => (
                        <IndexBadge key={index} index={index} onRemove={onRemoveClick} />
                    ))
                }
            </div>
        </div>
    )
}

export default MonitorIndexes
