import React, { useEffect, useState } from 'react'
import { syncSymbols, searchSymbols } from '../../services/SymbolService'
import SymbolRow from './SymbolRow'
import SelectQuote, { getDefaultQuote } from '../../components/SelectQuote/SelectQuote'
import SymbolModal from './SymbolModal'
import Pagination from '../../components/Pagination/Pagination'
import { usePage } from '../../hooks/navigation'
import { notify } from '../../components/Toast/Toast'


function Symbols() {
    const [symbols, setSymbols] = useState([])
    const [isSyncing, setIsSyncing] = useState(false)
    const [quote, setQuote] = useState(getDefaultQuote())
    const [editSymbol, setEditSymbol] = useState({})
    const [count, setCount] = useState(0)
    const [page] = usePage()

    function onQuoteChange(event) {
        setQuote(event.target.value)
    }

    function onSyncClick() {
        const token = localStorage.getItem('token')
        setIsSyncing(true)
        syncSymbols(token)
            .then(_ => {
                setIsSyncing(false)
            })
            .catch(error => {
                notify({ type: 'error', text: error.response ? error.response.data : error.message })
                console.error(error)
            })
    }

    function onModalSubmit(event) {
        loadSymbols(event.target.value.quote)
    }

    function loadSymbols(selectedValue) {
        const token = localStorage.getItem('token')
        const search = selectedValue === "FAVORITES" ? '' : selectedValue
        const onlyFavorites = selectedValue === "FAVORITES"

        searchSymbols({ search, onlyFavorites, page }, token)
            .then(result => {
                setSymbols(result.rows)
                setCount(result.count)
            })
            .catch(error => {
                notify({ type: 'error', text: error.response ? error.response.data : error.message })
                console.error(error)
            })
    }

    function onEditSymbol(event) {
        const symbol = event.target.id.replace('edit/', '')
        const symbolObj = symbols.find(s => s.symbol === symbol)

        setEditSymbol(symbolObj)
    }

    useEffect(() => {
        loadSymbols(quote)
    }, [isSyncing, quote, page])

    return (<React.Fragment>
        <div className="row">
            <div className="col-12">
                <div className='card border-0 shadow' >
                    <div className='card-header text-center'>
                        <div className='row align-items-center'>
                            <div className='col'>
                                <h2 className='h5 card-header'>Symbols</h2>
                            </div>
                            <div className='col'>
                                <SelectQuote onChange={onQuoteChange} saveQuote="true" />
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-items-center table-flush">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Symbol</th>
                                    <th scope="col">Base Prec</th>
                                    <th scope="col">Quote Prec</th>
                                    <th scope="col">Min Notional</th>
                                    <th scope="col">Min Lot Size</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {symbols?.map(item => <SymbolRow key={item.symbol} data={item} onClick={onEditSymbol} />)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="5">
                                        <Pagination count={count} />
                                    </td>
                                    <td colSpan="1" className="text-center">
                                        <button className="btn btn-primary animate-up-2" type="button" onClick={onSyncClick}>
                                            <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            {isSyncing ? 'Syncing...' : 'Sync'}
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <SymbolModal data={editSymbol} onSubmit={onModalSubmit} />
    </React.Fragment>)
}

export default Symbols
