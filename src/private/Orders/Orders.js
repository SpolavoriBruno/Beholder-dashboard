import React from "react"

function Orders() {
    return (<React.Fragment>
        <main className="content">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block">
                    <h2 className="h4">Orders</h2>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">

                    <div className="d-inline-flex align-items-center">
                        {/* <NewOrderButton /> */}
                    </div>
                </div>
            </div>
            <div className="card card-body border-0 shados table-wrapper table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="border-gray-200">Symbol</th>
                            <th className="border-gray-200">Date</th>
                            <th className="border-gray-200">Side</th>
                            <th className="border-gray-200">Qty</th>
                            <th className="border-gray-200">Net</th>
                            <th className="border-gray-200">Status</th>
                            <th className="border-gray-200">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                        }
                    </tbody>
                </table>
            </div>
        </main>
        {/* <NewOrderModal /> */}
    </React.Fragment>)
}

export default Orders
