import React, { useEffect, useState } from "react"
import "./Chartist.css"

const DEFAULT_REPORT = {
    quote: "BUSD",
    profit: 0,
    profitPerc: 0,
    sellVolume: 0,
    buyVolume: 0,
    series: [],
    subs: []
}

function LineChart({ data }) {
    const [report, setReport] = useState(DEFAULT_REPORT)

    useEffect(() => {
        if (!report || !report.series || !report.series.length) return

        const mod = report.subs.length > 20 ? 2 : 1
        const subs = report.subs.map((sub, i) => i % mod === 0 ? sub : '')

        new window.Chartist.Line('.ct-chart', {
            labels: subs,
            series: [report.series]
        }, {
            showArea: true,
            fullWidth: true,
            chartPadding: { rigth: 20 },
            axisX: { showGrid: true },
            axisy: {
                showGrid: true,
                showLabel: true,
            },
        })
    }, [report])

    useEffect(() => {
        if (!data) return
        setReport(data)
    }, [data])


    function getText(value) {
        const signal = value > 0 ? "+" : "-"
        return `${signal}${Math.abs(value).toFixed(2)}`
    }

    function getTextClass(value) {
        return parseFloat(value) > 0 ? "text-success" : "text-danger"
    }

    return (
        <div className="card bg-primary text-white border-0 shadow">
            <div className="card-header d-sm-flex flex-row align-items-center flex-0">
                <div className="d-block  mb-sm-0">
                    <h2 className="fs-3 fw-bold my-0">{report.quote} {getText(report.sellVolume - report.buyVolume)}</h2>
                </div>
                <div className="d-block ms-3">
                    <div className="small">
                        <span className={getTextClass(report.profit) + " fw-extrabold"}>
                            ({getText(report.profitPerc) + '%'})
                        </span>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="ct-chart ct-double-octave">
                </div>
            </div>
        </div >)
}

export default LineChart
