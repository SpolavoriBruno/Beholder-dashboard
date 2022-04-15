import React, { useEffect, useState } from "react";

/**
 * props?
 * - onChange
 */
function SelectQuote(props) {
    const [defaultQuote, setDefaultQuote] = useState(getDefaultQuote());

    function onQuoteChange(event) {
        props.onChange(event);
        setDefaultQuote(event.target.value);
        localStorage.setItem("defaultQuote", event.target.value);
    }

    return (
        <select id="selectQuote" className="form-select" defaultValue={defaultQuote} onChange={onQuoteChange}>
            <option value="favorites">Favorites</option>
            <option value="BNB">BNB</option>
            <option value="BRL">BRL</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="BUSD">BUSD</option>
            <option value="USDT">USDT</option>
        </select>
    )
}

export function getDefaultQuote() {
    const quote = localStorage.getItem('defaultQuote')
    return quote ? quote : "BUSD"
}

export default SelectQuote;
