import React, { useState } from "react"

/**
 * props?
 * - onChange
 * - hideFavorites
 */
function SelectQuote({ onChange, hideFavorites, saveQuote = false }) {
    const [defaultQuote, setDefaultQuote] = useState(getDefaultQuote(hideFavorites))

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

export function getDefaultQuote(hideFavorites = true) {
    const quote = localStorage.getItem('defaultQuote') || "USDT"
    if (hideFavorites) return quote !== "FAVORITES" ? quote : "USDT"
    return quote
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
