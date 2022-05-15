import React from "react"
/**
 * props
 * - id
 * - index
 * - children
 * - text
 * - onClick
 * - onRemove
 */
function SmartBadge(props) {
    return (<div className="input-group me-2 d-flex flex-row flex-nowrap">
        <span className="badge bg-info alert py-1 px-2 align-content-center" id={`edit/${props.id || props.index}`} onClick={props.onClick}>
            {props.children}<label className="mb-0 py-1 ms-1">{props.text}</label>
        </span>
        <button className="btn btn-xs btn-tertiary alert px-2" title="Remove" id={`remove/${props.id || props.index}`} onClick={props.onRemove}>
            X
        </button>
    </div>)
}

export default SmartBadge

