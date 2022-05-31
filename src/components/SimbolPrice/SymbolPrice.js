import React, { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"

/**
 * props
 * - symbol
 * - onChange
 */
function SymbolPrice(props) {
    const [book, setBook] = useState({ ask: 0, bid: 0 })
    const [symbol, setSymbol] = useState('')

    function getBinanceWSUrl() {
        return `${process.env.REACT_APP_BWS_URL}/${symbol.toLowerCase()}@bookTicker`
    }

    const { lastJsonMessage, sendJsonMessage } = useWebSocket(getBinanceWSUrl(), {
        onOpen: () => {
            console.info(`Connected to WS Server - ${symbol}`)
            sendJsonMessage({
                method: "SUBSCRIBE",
                params: [`${symbol.toLowerCase()}@bookTicker`],
                id: 1
            })
        },
        onMessage: () => {
            if (lastJsonMessage) {
                const book = { bid: lastJsonMessage.b, ask: lastJsonMessage.a }
                setBook(book)
                if (typeof props.onChange === 'function') props.onChange(book)
            }
        },
        onError: console.error,
        shouldReconnect: _ => true,
        reconnectInterval: 3000,
        reconnectAttempts: 20
    })

    useEffect(() => setSymbol(props.symbol), [props.symbol])

    if (!symbol) return (<></>)

    return (
        <div className="form-group justify-items-center">
            <label>Maket Price</label>
            <p>Bid: {book.bid}</p>
            <p>Ask: {book.ask}</p>
        </div>
    )
}

export default SymbolPrice
