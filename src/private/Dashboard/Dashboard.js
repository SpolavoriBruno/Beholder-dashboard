import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import useWebSocket from "react-use-websocket"

import MiniTicker from "./MiniTicker/MiniTicker"
import BookTicker from "./BookTicker/BookTicker"
import Wallet from "./Wallet/Wallet"
import CandleChart from "./CandleChart"
import NewOrderButton from "../../components/NewOrder/NewOrderButton"
import NewOrderModal from "../../components/NewOrder/NewOrderModal"
import SelectSymbol from "../../components/NewOrder/SelectSymbol"

function Dashboard() {
    const history = useHistory()

    const [miniTickerState, setMiniTickerState] = useState({})
    const [bookState, setBookState] = useState({})
    const [balanceState, setBalanceState] = useState({})
    const [wallet, setWallet] = useState({})
    const [chartSymbol, setChartSymbol] = useState('BTCUSDT');

    function onOrderSubmit(order) {
        history.push(`/orders/${order.symbol}`)
    }

    function onChangeSymbol(event) {
        setChartSymbol(event.target.value);
    }

    const { lastJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
        onOpen: () => console.info('Connected to WS Server'),
        onMessage: data => {
            if (lastJsonMessage) {
                if (lastJsonMessage.miniTicker)
                    setMiniTickerState(lastJsonMessage.miniTicker)

                if (lastJsonMessage.balance)
                    setBalanceState(lastJsonMessage.balance)

                if (lastJsonMessage.book) {
                    lastJsonMessage.book.forEach(b => bookState[b.symbol] = b)
                    setBookState(bookState)
                }

            }
        },
        onError: error => console.error(error),
        shouldReconnect: closeEvent => true,
        reconnectInterval: 3000,
        reconnectAttempts: 20,
        queryParams: { token: localStorage.getItem('token') }
    })

    return (<React.Fragment>

        <main className="content">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block">
                    <h1 className="h4 mb-0">Dashboard</h1>
                </div>
                <div className="btn-toolbar align-items-center">
                    <div className="ms-2 ms-lg-3">
                        <SelectSymbol onChange={onChangeSymbol} />
                    </div>
                    <div className="ms-2 ms-lg-3">
                        <NewOrderButton />
                    </div>
                </div>
            </div>
            <CandleChart symbol={chartSymbol} />
            <MiniTicker data={miniTickerState} />
            <div className="row">
                <BookTicker data={bookState} />
                <Wallet data={balanceState} onUpdate={setWallet} />
            </div>
        </main>
        <NewOrderModal wallet={wallet} onSubmit={onOrderSubmit} />
    </React.Fragment>)
}

export default Dashboard
