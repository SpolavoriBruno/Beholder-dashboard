import React, { useEffect, useMemo } from "react"

function CandleChart(props) {
    useEffect(() => {
        new window.TradingView.widget({
            symbol: `BINANCE:${props.symbol}`,
            autosize: true,
            interval: "1",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            details: true,
            withdateranges: true,
            hide_side_toolbar: false,
            studies: [
                "RSI@tv-basicstudies"
            ],
            "container_id": "tradingview"
        })
    }, [props.symbol])

    const widgetHTML = useMemo(() => (

        <div className="card card-dark border-0 shadow mb-3">
            <div className="card-body p-2 tradingview-widget-container">
                <div id="tradingview" className="tradingview"></div>
            </div>
        </div>

    ), [])

    return widgetHTML
}

export default CandleChart
