import React, { useEffect, useState } from "react"
import DateFilter from "../../components/DateFilter/DateFilter"
import SelectQuote, { getDefaultQuote } from "../../components/SelectQuote/SelectQuote"
import { getDayTradeReport, getOrdersReport } from "../../services/OrdersService"
import { notify } from "../../components/Toast/Toast"
import LineChart from "./LineChart"
import InfoBlock from "../../components/InfoBlock/InfoBlock"
import Wallet from "../../components/Wallet/Wallet"
import AutomationReports from "./AutomationReports"

function Reports() {
    const [filter, setFilter] = useState({})
    const [report, setReport] = useState({})

    function onQuoteChange(event) {
        setFilter(prevState => ({ ...prevState, symbol: event.target.value }))
    }

    function onDateChange(event) {
        const { startDate, endDate } = event.target.value
        setFilter(prevState => ({ ...prevState, startDate, endDate }));
    }

    useEffect(() => {
        if (!filter || !filter.symbol) return setFilter({ ...filter, symbol: getDefaultQuote() })
        const token = localStorage.getItem('token')

        let promise

        if (filter.startDate && filter.endDate && filter.startDate.getTime() === filter.endDate.getTime())
            promise = getDayTradeReport(filter.symbol, filter.startDate, token)
        else
            promise = getOrdersReport(filter.symbol, filter.startDate, filter.endDate, token)

        promise
            .then(setReport)
            .catch(error => {
                notify(error.body ? error.body : error.message)
                console.error(error)
            })
    }, [filter])

    return (
        <main className="content">
            <div className="row py-4 nowrap">
                <div className="col-3">
                    <h2 className="h4">Reports</h2>
                </div>
                <div className="col-2">
                    <SelectQuote onChange={onQuoteChange} hideFavorites="true" />
                </div>
                <div className="col-7">
                    <DateFilter onClick={onDateChange} />
                </div>
            </div>
            <div>
                <LineChart data={report} />
                <div className="row my-md-4 my-2">
                    <InfoBlock title="Buy Volume" value={report.buyVolume} background="secondary">
                        <svg className="icon icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </InfoBlock>
                    <InfoBlock title="Sell Volume" value={report.sellVolume} background="success">
                        <svg className="icon icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </InfoBlock>
                    <InfoBlock title="Orders" value={report.orders} precision={0}>
                        <svg className="icon icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    </InfoBlock>
                </div>
                <div className="row">
                    <Wallet />
                    <AutomationReports data={report.automations} />
                </div>
            </div>
        </main >
    )
}

export default Reports
