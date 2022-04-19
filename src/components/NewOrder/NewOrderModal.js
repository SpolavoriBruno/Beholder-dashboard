import React, { useRef, useState } from "react"

function NewOrderModal() {
    const btnClose = useRef('')
    const btnSend = useRef('')

    const [error, setError] = useState('')

    function onSubmit(event) {
        console.log('onSubmit')
    }

    return (
        <div className="modal fade" id="modalOrder" tabIndex="-1" role="dialog" aria-labelledby="modalOrderLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="h5 modal-title" id="modalOrderLabel">New Order</h2>
                        <button type="button" ref={btnClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="form-group">
                                <div className="col-md-6">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {error &&
                            <div className="alert alert-danger mt-1 col-9 py-1" role="alert">{error}</div>
                        }
                        <button type="button" ref={btnSend} className="btn btn-sm btn-primary" onClick={onSubmit} data-bs-dismiss="modal">Send</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default NewOrderModal
