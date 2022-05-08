import React, { useEffect, useMemo, useRef, useState } from "react"
import { getMonitorTypes } from "../../services/MonitorService"

/** 
 * props
 * - type
 * - onChange
 */
function MonitorType(props) {
    const [monitorTypes, setMonitorTypes] = useState([])

    const selectRef = useRef('')
    const selectType = useMemo(() => (
        <div className="form-group">
            <label htmlFor="type">Type</label>
            <select ref={selectRef} id="type" className="form-select" onChange={props.onChange} placeholder="Select a Type">
                {
                    monitorTypes.sort((a, b) => (a < b ? -1 : 1)).map(type => {
                        const name = type.type
                            .toLocaleLowerCase()
                            .split("_")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")
                        return (<option key={type.type} value={type.type} disabled={type.systemOnly}>{name}</option>)
                    })
                }
            </select>
        </div>
    ), [props.type, monitorTypes])

    useEffect(() => {
        selectRef.current && (selectRef.current.value = props.type || 'CANDLES')
        props.onChange({ target: { id: 'type', value: props.type || 'CANDLES' } })
    }, [props.type])

    useEffect(() => {
        const token = localStorage.getItem('token')
        getMonitorTypes(token)
            .then(newTypes => {
                setMonitorTypes(
                    newTypes.sort((a, b) => ((a.type > b.type || a.systemOnly) ? 1 : -1))
                )
            })
    }, [])

    return selectType
}

export default MonitorType
