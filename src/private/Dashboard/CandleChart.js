import React, { useEffect, useMemo } from "react"

function CandleChart(props) {
    useEffect(() => {
        new window.TradingView.widget({
            symbol: `BINANCE:${props.symbol}`,
            autosize: true,
            interval: "1",
            timezone: "America/Sao_Paulo",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#1F2937",
            enable_publishing: false,
            allow_symbol_change: false,
            details: true,
            withdateranges: false,
            hide_side_toolbar: true,
            hide_top_toolbar: true,
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
