import React, { useEffect, useState } from "react"
import SelectQuote, { filterSymbolsName, getDefaultQuote } from "../../../components/SelectQuote/SelectQuote"
import { getSymbols } from "../../../services/SymbolService"
import BookRow from "./BookRow"
import "../Dashboard.css"

export default function BookTicker(props) {

    const [symbols, setSymbols] = useState([])
    const [quote, setQuote] = useState(getDefaultQuote())

    function onQuoteChange(event) {
        setQuote(event.target.value)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        getSymbols(token)
            .then(symbols => setSymbols(filterSymbolsName(symbols, quote)))
            .catch(error => {
                if (error?.response?.status === 401) return
                console.error(error)
            })
    }, [quote])

    if (!props || !props.data) return (<React.Fragment></React.Fragment>)

    return (<React.Fragment>
        <div className="col-sm-12 col-md-6 mb-4">
            <div className="card border-0 shadow">
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h2 className="fs-5 fw-bold mb-0">Book</h2>
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
                                <th className="border-bottom col-2" scope="col">BID</th>
                                <th className="border-bottom col-2" scope="col">ASK</th>
                            </tr>
                        </thead>
                        <tbody>
                            {symbols.map(symbol =>
                                <BookRow key={symbol} symbol={symbol} data={props.data[symbol]} />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </React.Fragment>);
}
