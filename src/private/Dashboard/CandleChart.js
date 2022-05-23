import React, { useEffect, useMemo } from "react"

function CandleChart(props) {
    useEffect(() => {
        new window.TradingView.widget({
            width: 1200,
            height: 700,
            symbol: `BINANCE:${props.symbol}`,
            autosize: false,
            interval: "1",
            timezone: "America/Sao_Paulo",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#1F2937",
            enable_publishing: false,
            allow_symbol_change: false,
            details: false,
            withdateranges: false,
            hide_side_toolbar: false,
            hide_top_toolbar: false,
            studies: [
                "BB@tv-basicstudies",
                "MACD@tv-basicstudies",
                "RSI@tv-basicstudies",
                "VWAP@tv-basicstudies"
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
