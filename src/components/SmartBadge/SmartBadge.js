import React from "react"

function SmartBadge(props) {
    return (<div className="input-group me-2 d-flex flex-row flex-nowrap">
        <span className="badge bg-info alert py-2">{props.text}</span>
        <button className="btn btn-xs btn-tertiary alert px-2" title="Remove" id={`remove/${props.id || props.index}`} onClick={props.onRemove}>
            X
        </button>
    </div>)
}

export default SmartBadge
