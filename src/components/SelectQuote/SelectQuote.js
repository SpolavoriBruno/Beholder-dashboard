import React, { useState } from "react"

/**
 * props?
 * - onChange
 * - hideFavorites
 */
function SelectQuote({ onChange, hideFavorites, saveQuote = false }) {
    const [defaultQuote, setDefaultQuote] = useState(getDefaultQuote())

    function onQuoteChange(event) {
        onChange(event)
        if (saveQuote) {
            setDefaultQuote(event.target.value)
            localStorage.setItem("defaultQuote", event.target.value)
        }
    }

    return (
        <select id="selectQuote" className="form-select" defaultValue={defaultQuote} onChange={onQuoteChange}>
            {!hideFavorites && <option value="FAVORITES">Favorites</option>}
            <option value="USDT">USDT</option>
            <option value="BUSD">BUSD</option>
            <option value="BTC">BTC</option>
            <option value="BNB">BNB</option>
            <option value="ETH">ETH</option>
        </select>
    )
}

export function getDefaultQuote() {
    const quote = localStorage.getItem('defaultQuote')
    return quote && quote !== "FAVORITES" ? quote : "USDT"
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
