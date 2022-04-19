import React, { useEffect, useState } from "react"

import { getSymbols } from "../../../services/SymbolService"
import SelectQuote, { filterSymbolsName, getDefaultQuote } from "../../../components/SelectQuote/SelectQuote"
import TickerRow from "./TickerRow"
import '../Dashboard.css'

function MiniTicker(props) {
    const [symbols, setSymbols] = useState([])
    const [quote, setQuote] = useState(getDefaultQuote())

    useEffect(() => {
        const token = localStorage.getItem('token')
        getSymbols(token)
            .then(symbols => setSymbols(filterSymbolsName(symbols, quote)))
            .catch(error => {
                if (error?.response?.status === 401) return
                console.error(error)
            })
    }, [quote])

    function onQuoteChange(event) {
        setQuote(event.target.value)
    }

    if (!props || !props.data) return (<React.Fragment></React.Fragment>)

    return (<React.Fragment>
        <div className="col-12 mb-4">
            <div className="card border-0 shadow">
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h2 className="fs-5 fw-bold mb-0">Market 24h</h2>
                        </div>
                        <div className="col offset-md-3">
                            <SelectQuote onChange={onQuoteChange} />
                        </div>
                    </div>
                </div>
                <div className="table-responsive divScroll">
                    <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-bottom" scope="col">SYMBOL</th>
                                <th className="border-bottom col-2" scope="col">CLOSE</th>
                                <th className="border-bottom col-2" scope="col">OPEN</th>
                                <th className="border-bottom col-2" scope="col">HIGH</th>
                                <th className="border-bottom col-2" scope="col">LOW</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                symbols.map(item => (
                                    <TickerRow key={item} symbol={item} data={props.data[item]} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </React.Fragment>)
}

export default MiniTicker
