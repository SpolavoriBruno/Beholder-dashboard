import React, { useState } from "react"
import useWebSocket from "react-use-websocket"

/**
 * props
 * - symbol
 * - onChange
 */
function SymbolPrice(props) {

    const [book, setBook] = useState({ ask: 0, bid: 0 })

    const { lastJsonMessage, sendJsonMessage } = useWebSocket(getBinanceWSUrl(), {
        onOpen: () => {
            console.info(`Connected to WS Server - ${props.symbol}`)
            sendJsonMessage({
                method: "SUBSCRIBE",
                params: [`${props.symbol.toLowerCase()}@bookTicker`],
                id: 1
            })
        },
        onMessage: () => {
            if (lastJsonMessage) {
                const book = { bid: lastJsonMessage.b, ask: lastJsonMessage.a }
                setBook(book)
                if (props.onChange) props.onChange(book)
            }
        },
        onError: console.error,
        shouldReconnect: closeEvent => true,
        reconnectInterval: 3000,
        reconnectAttempts: 20
    })

    function getBinanceWSUrl() {
        return `${process.env.REACT_APP_BWS_URL}/${props.symbol.toLowerCase()}@bookTicker`
    }

    if (!props.symbol) return (<></>)

    return (
        <div className="form-group justify-items-center">
            <label>Maket Price</label>
            <p>Bid: {book.bid}</p>
            <p>Ask: {book.ask}</p>
        </div>
    )
}

export default SymbolPrice
