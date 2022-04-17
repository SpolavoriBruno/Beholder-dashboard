import React from "react"

function SymbolModal(props) {
    function onFormSubmit(event) {

    }
    return (
        <div className="modal fade" id="modalSymbol" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title" id="modalTitleNotify"> Edit Symbol</p>
                        <button className="btn btn-close" type="button" data-bs-dismiss="modal" aria-label="close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="symbol">Symbol</label>
                                <div className="input-group">
                                    <input className="form-control" id="symbol" type="text" placeholder="BTCUSD" />
                                    <button className="btn btn-secondary d-inline-flex align-items-center me-2">
                                        <svg className="icon icon-xs" fill="white" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="basePrecision">Base Precision:</label>
                                <input id="basePrecision" type="number" className="form-control" placeholder="8" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="quotePrecision">Quote Precision:</label>
                                <input id="quotePrecision" type="number" className="form-control" placeholder="8" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="minNotional">Min Notional:</label>
                                <input id="minNotional" type="text" className="form-control" placeholder="8" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="minLotSize">Min Lot Size:</label>
                                <input id="minLotSize" type="number" className="form-control" placeholder="8" required />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-sm btn-primary" type="submit" data-bs-toggle="modal" data-bs-target="#modalSymbol">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SymbolModal
