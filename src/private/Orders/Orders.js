import React, { useEffect, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router-dom"

import NewOrderModal from "../../components/NewOrder/NewOrderModal"
import NewOrderButton from "../../components/NewOrder/NewOrderButton"
import { getBalance } from "../../services/ExchangeService"
import { getOrders } from "../../services/OrdersService"
import OrderRow from "./OrderRow"
import OrderPagination from "./OrderPagination"


function Orders() {
    const history = useHistory()
    const defaultLocation = useLocation()
    const { symbol } = useParams()

    const [count, setCount] = useState(0)
    const [balances, setBalances] = useState({})
    const [orders, setOrders] = useState([])
    const [search, setSearch] = useState(symbol || '')
    const [page, setPage] = useState(getLocation() || 1)

    function getLocation(location) {
        if (!location) location = defaultLocation
        return new URLSearchParams(location.search).get('page')
    }

    function processError(error) {
        if (error.response?.status === 401)
            return history.push('/')
        console.error(error)
    }

    function getBalancesCall(token) {
        getBalance(token)
            .then(balances => {
                setBalances(balances)
            })
            .catch(processError)
    }

    function getOrdersCall(token) {
        console.log(search, page)
        getOrders(search, page, token)
            .then(result => {
                console.log(result);
                setOrders(result.rows)
                setCount(result.count)
            })
            .catch(processError)
    }

    useEffect(() => {
        return history.listen(location => {
            setPage(getLocation(location))
        })
    }, [history])

    useEffect(() => {
        const token = localStorage.getItem("token")

        getBalancesCall(token)
        getOrdersCall(token)
    }, [page])

    function onOrderSubmit(order) {
        history.go(0)
    }

    return (<React.Fragment>
        <main className="content">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block">
                    <h2 className="h4">Orders</h2>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="d-inline-flex align-items-center">
                        <NewOrderButton />
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
                            orders?.map(order => (<OrderRow key={order.clientOrderId} data={order} />))
                        }
                    </tbody>
                </table>
                <OrderPagination count={count} />
            </div>
        </main>
        <NewOrderModal wallet={balances} onSubmit={onOrderSubmit} />
    </React.Fragment>)
}

export default Orders
