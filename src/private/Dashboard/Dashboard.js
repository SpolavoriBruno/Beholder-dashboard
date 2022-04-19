import React, { useState } from "react"
import useWebSocket from "react-use-websocket"

import MiniTicker from "./MiniTicker/MiniTicker"
import BookTicker from "./BookTicker/BookTicker"
import Wallet from "./Wallet/Wallet"
import CandleChart from "./CandleChart"
import NewOrderButton from "../../components/NewOrder/NewOrderButton"
import NewOrderModal from "../../components/NewOrder/NewOrderModal"

function Dashboard() {
    const [miniTickerState, setMiniTickerState] = useState({})
    const [bookState, setBookState] = useState({})
    const [balanceState, setBalanceState] = useState({})

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
            <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block">
                    <h1 className="h4">Dashboard</h1>
                </div>
                <div className="d-block px-12">
                    <NewOrderButton />
                </div>
            </div>
            <CandleChart symbol="BTCUSDT" />
            <MiniTicker data={miniTickerState} />
            <div className="row">
                <BookTicker data={bookState} />
                <Wallet data={balanceState} />
            </div>
        </main>
        <NewOrderModal />
    </React.Fragment>)
}

export default Dashboard
