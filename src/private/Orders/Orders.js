import React, { useEffect, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router-dom"

import NewOrderModal from "../../components/NewOrder/NewOrderModal"
import NewOrderButton from "../../components/NewOrder/NewOrderButton"
import { getBalance } from "../../services/ExchangeService"
import { getOrders } from "../../services/OrdersService"
import OrderRow from "./OrderRow"
import Pagination from "../../components/Pagination/Pagination"
import SearchSymbol from "../../components/SearchSymbol/SearchSymbol"
import ViewOrderModal from "./ViewOrderModal"


function Orders() {
    const history = useHistory()
    const defaultLocation = useLocation()
    const { symbol } = useParams()

    const [count, setCount] = useState(0)
    const [balances, setBalances] = useState({})
    const [viewOrder, setViewOrder] = useState({})
    const [orders, setOrders] = useState([])
    const [search, setSearch] = useState(symbol || '')
    const [page, setPage] = useState(getLocation() || 1)

    function processError(error) {
        if (error.response?.status === 401)
            return history.push('/')
        console.error(error)
    }

    function getLocation(location) {
        if (!location) location = defaultLocation
        return new URLSearchParams(location.search).get('page')
    }

    function getBalancesCall(token) {
        getBalance(token)
            .then(balances => {
                setBalances(balances)
            })
            .catch(processError)
    }

    function getOrdersCall(token) {
        getOrders(search, page, token)
            .then(result => {
                setOrders(result.rows)
                setCount(result.count)
            })
            .catch(processError)
    }

    function onOrderSubmit(order) {
        history.go(0)
    }

    function onSearchChange(event) {
        setSearch(event.target.value)
    }

    function onViewOrderClick(event) {
        const id = +event.target.id.split('/')[1]
        setViewOrder(orders.find(order => order.id === id))
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
    }, [page, search])

    return (<React.Fragment>
        <main className="content">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block">
                    <h2 className="h4">Orders</h2>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0 align-items-center">
                    <div className="d-inline-flex">
                        <NewOrderButton />
                    </div>
                    <div className="btn-group ms-4">
                        <SearchSymbol placeholder="Search symbol" onChange={onSearchChange} />
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
                            orders?.map(order => (<OrderRow key={order.clientOrderId} data={order} onClick={onViewOrderClick} />))
                        }
                    </tbody>
                </table>
                <Pagination count={count} />
            </div>
        </main>
        <NewOrderModal wallet={balances} onSubmit={onOrderSubmit} />
        <ViewOrderModal data={viewOrder} />
    </React.Fragment>)
}

export default Orders
