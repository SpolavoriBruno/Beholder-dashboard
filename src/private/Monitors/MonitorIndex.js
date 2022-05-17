import React, { useEffect, useRef, useState } from "react"
import SmartBadge from "../../components/SmartBadge/SmartBadge"
import { getAnalysisIndexes } from "../../services/BeholderService"

/** 
 * props
 * - indexes
 * - onChange
 */
function MonitorIndexes(props) {
    const selectRef = useRef('')
    const paramsRef = useRef('')

    const [indexes, setIndexes] = useState([])
    const [analysisIndexes, setAnalysisIndexes] = useState([])

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

    function onIndexChange(event) {
        const { id, value } = event.target
        const { params } = analysisIndexes[value]
        paramsRef.current.placeholder = params
        if (value === '')
            paramsRef.current.className = 'd-none'
        else
            paramsRef.current.className = 'form-control'
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        getAnalysisIndexes(token).then(setAnalysisIndexes)
    }, [])

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
                <select ref={selectRef} id="indexes" className="form-select" onChange={onIndexChange}>
                    <option value=""></option>
                    {Object.entries(analysisIndexes)
                        .sort((a, b) => {
                            if (a[0] < b[0]) return -1
                            if (a[0] > b[0]) return 1
                            return 0
                        })
                        .map(prop => (
                            <option key={prop[0]} value={prop[0]}>{prop[1].name}</option>
                        ))
                    }
                </select>
                <input ref={paramsRef} type="text" id="params" placeholder="params" className="d-none" />
                <button className="btn btn-sm btn-tertiary" onClick={onAddClick}>
                    <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
            <div className="divScrollBadges">
                <div className="d-inline-flex align-content-start mt-3">
                    {indexes.map(index => (
                        <SmartBadge key={index} index={index} text={index} onRemove={onRemoveClick} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MonitorIndexes
