import React, { useState } from "react";
import useWebSocket from "react-use-websocket";

import MiniTicker from "./MiniTicker/MiniTicker";
import BookTicker from "./BookTicker/BookTicker";

function Dashboard() {
    const [miniTickerState, setMiniTickerState] = useState({})
    const [bookState, setBookState] = useState({})

    const { lastJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
        onOpen: () => console.info('Connected to WS Server'),
        onMessage: data => {
            if (lastJsonMessage) {
                if (lastJsonMessage.miniTicker)
                    setMiniTickerState(lastJsonMessage.miniTicker)
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

    })

    return (<React.Fragment>
        <main className="content">
            <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
                <h1 className="h4">Dashboard</h1>
            </div>
            <MiniTicker data={miniTickerState} />
            <BookTicker data={bookState} />
            <div className="row">
            </div>
        </main>
    </React.Fragment>)
}

export default Dashboard
