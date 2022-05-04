import React from "react"

function IndexBadge(props) {

    return (<div className="input-group me-2 d-flex flex-row flex-nowrap" key={props.index}>
        <span className="badge bg-info alert py-2">{props.index}</span>
        <button className="btn btn-xs btn-tertiary alert px-2" title="Remove" id={`remove/${props.index}`} onClick={props.onRemove}>
            X
        </button>
    </div>)

}

export default IndexBadge
