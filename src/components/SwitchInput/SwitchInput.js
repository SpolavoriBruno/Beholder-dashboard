import React, { useEffect, useRef } from "react"

/**
 * props 
 * - id
 * - text
 * - isChecked
 * - onChange
 */
function SwitchInput(props) {
    const switchRef = useRef('')

    function onChange(event) {
        props.onChange({ target: { id: props.id, value: switchRef.current.checked } })
    }

    useEffect(() => {
        switchRef.current.checked = props.isChecked
    }, [props.isChecked])

    return (<div className="form-check form-switch" key={props.index}>
        <input ref={switchRef} type="checkbox" className="form-check-input" id={props.id} onChange={onChange} />
        <label htmlFor={props.id}>{props.text}</label>
    </div>)
}

export default SwitchInput
