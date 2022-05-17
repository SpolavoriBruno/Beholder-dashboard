import React from "react"

function Card(props) {
    return (<React.Fragment>
        <div className="card card-body border-0 text-center shadow mx-2 px-2 mb-3" style={{ 'maxWidth': props.width || '24rem' }}>
            <h2 className="h5 card-header">{props.title}</h2>
            <div className="card-body">
                {props.children}
                <div className="text-center">
                    <button className="btn btn-primary animate-up-2" onClick={props.onSubmit}>Save</button>
                </div>
            </div>
        </div>
    </React.Fragment >)
}

export default Card
