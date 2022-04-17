import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import LineChart from "./LineChart";

function Dashboard() {
    const [tickerState, setTickerState] = useState({})

    const { lastJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
        onOpen: () => console.info('Connected to WS Server'),
        onMessage: data => {
            if (lastJsonMessage) {
                if (lastJsonMessage.miniTicker)
                    setTickerState(lastJsonMessage.miniTicker)
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
            <LineChart />
            {JSON.stringify(tickerState)}
        </main>
    </React.Fragment>)
}

export default Dashboard
