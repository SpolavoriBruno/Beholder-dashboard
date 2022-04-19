import React from "react"

function NewOrderButton() {
    return (
        <button
            id="btn-new-order"
            className="btn btn-primary btn-lg animate-up-2"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modalOrder"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle New Order Form"
        >
            <svg className="icon icon-xs me-2" stroke="currentColor" viewBox="2 4 24 20" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            New Order
        </button>
    )
}

export default NewOrderButton
