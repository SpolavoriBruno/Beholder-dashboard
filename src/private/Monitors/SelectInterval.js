import React, { useEffect, useMemo, useRef, useState } from "react"
import { INTERVAL } from "../../utils/exchange"

/** 
 * props
 * - interval
 * - onChange
 */
function SelectInterval(props) {
    const selectRef = useRef('')
    const selectInterval = useMemo(() => (
        <div className="form-group">
            <label htmlFor="interval">Interval</label>
            <select ref={selectRef} id="interval" className="form-select" onChange={props.onChange} >
                {
                    Object.entries(INTERVAL).map(interval => {
                        const name = interval[0]
                            .toLocaleLowerCase()
                            .split("_")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")
                        return (<option key={interval[1]} value={interval[1]}>{name}</option>)
                    })
                }
            </select>
        </div>
    ), [props.interval])

    useEffect(() => {
        selectRef.current.value = props.interval
        props.onChange({ target: { id: 'interval', value: props.interval } })
    }, [props.interval])

    return selectInterval
}

export default SelectInterval
