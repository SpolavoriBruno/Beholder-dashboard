import React, { useEffect, useState } from "react"
import { getBalance } from "../../services/ExchangeService"

export default function Wallet({ onUpdate, forceUpdate }) {

    const [balances, setBalances] = useState([])
    const [usd, setUsd] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem('token')
        getBalance(token)
            .then(balances => {
                onUpdate && onUpdate(balances)

                const usd = balances.find(item => item.symbol === 'estimatedUSD').available
                balances = balances.filter(item => item.symbol !== 'estimatedUSD')
                setUsd(usd)

                balances = balances.filter(balance => balance.available > 0)
                setBalances(balances)
            })
            .catch(console.error)

    }, [forceUpdate])

    return (<React.Fragment>
        <div className="col mb-4">
            <div className="card border-0 shadow">
                <div className="card-header row">
                    <div className="col">
                        <h2 className="fs-5 fw-bold mb-0">Wallet</h2>
                    </div>
                    <div className="col">
                        {usd && "~USD " + usd}
                    </div>
                </div>
                <div className="table-responsive divScroll">
                    <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-bottom" scope="col">SYMBOL</th>
                                <th className="border-bottom col-2" scope="col">FREE</th>
                                <th className="border-bottom col-2" scope="col">LOCK</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                balances?.map(item => (
                                    <tr key={`wallet/${item.symbol}`}>
                                        <td className="text-gray-900">{item.symbol}</td>
                                        <td className="text-gray-900">{item.available.substring(0, 8)}</td>
                                        <td className="text-gray-900">{item.onOrder.substring(0, 8)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </React.Fragment>)
}
