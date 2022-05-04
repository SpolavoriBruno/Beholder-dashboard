import React, { useEffect, useMemo, useRef } from "react"
import { ORDER_TYPE } from "../../utils/exchange"

/** 
 * props
 * - type
 * - onChange
 */
function MonitorType(props) {
    const selectRef = useRef('')
    const selectType = useMemo(() => (
        <div className="form-group">
            <label htmlFor="type">Type</label>
            <select ref={selectRef} id="type" className="form-select" onChange={props.onChange} >
                {
                    Object.entries(ORDER_TYPE).map(type => {
                        const name = type[1]
                            .toLocaleLowerCase()
                            .split("_")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")
                        return (<option key={type[1]} value={type[1]}>{name}</option>)
                    })
                }
            </select>
        </div>
    ), [props.type])

    useEffect(() => {
        selectRef.current && (selectRef.current.value = props.type)
        props.onChange({ target: { id: 'type', value: props.type } })
    }, [props.type])

    return selectType
}

export default MonitorType
