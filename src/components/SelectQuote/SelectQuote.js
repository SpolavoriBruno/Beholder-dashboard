import React, { useState } from "react"

/**
 * props?
 * - onChange
 */
function SelectQuote(props) {
    const [defaultQuote, setDefaultQuote] = useState(getDefaultQuote())

    function onQuoteChange(event) {
        props.onChange(event)
        setDefaultQuote(event.target.value)
        localStorage.setItem("defaultQuote", event.target.value)
    }

    return (
        <select id="selectQuote" className="form-select" defaultValue={defaultQuote} onChange={onQuoteChange}>
            <option value="FAVORITES">Favorites</option>
            <option value="BNB">BNB</option>
            <option value="BRL">BRL</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="BUSD">BUSD</option>
            <option value="USDT">USDT</option>
            <option value="USD">USD</option>
        </select>
    )
}

export function getDefaultQuote() {
    const quote = localStorage.getItem('defaultQuote')
    return quote ? quote : "BUSD"
}

export function filterSymbolsName(symbols, quote) {
    return filterSymbolsObject(symbols, quote).map(s => s.symbol)
}

export function filterSymbolsObject(symbols, quote) {
    return symbols.filter(item => {
        if (quote === "FAVORITES")
            return item.isFavorite
        else
            return item.symbol.endsWith(quote)
    })
}

export default SelectQuote
