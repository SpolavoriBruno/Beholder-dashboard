import React, { useEffect, useMemo, useState } from "react"
import { getMemoryIndex } from "../../services/BeholderService"

function WalletSumary({ symbol, onChange }) {
    const [wallet, setWallet] = useState({ base: 0, quote: 0 })

    async function loadWallet(symbol) {
        const token = localStorage.getItem('token')
        try {
            const base = await getMemoryIndex(symbol.base, 'WALLET', null, token)
            const quote = await getMemoryIndex(symbol.quote, 'WALLET', null, token)
            setWallet({
                base: {
                    symbol: symbol.base,
                    qty: base,
                },
                quote: {
                    symbol: symbol.quote,
                    qty: quote,
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!symbol || !symbol.base) return
        loadWallet(symbol)
    }, [symbol])

    useEffect(() => {
        if (!wallet || typeof onChange !== 'function') return
        onChange(wallet)
    }, [wallet, onChange])

    const walletSumary = useMemo(() => (
        <div className="row">
            <div className="col-md-6">
                <div className="alert alert-success py-1">
                    {`${wallet.base.symbol}: ${wallet.base.qty}`}
                </div>
            </div>
            <div className="col-md-6">
                <div className="alert alert-info py-1">
                    {`${wallet.quote.symbol}: ${wallet.quote.qty}`}
                </div>
            </div>
        </div>
    ), [wallet])

    return walletSumary
}

export default WalletSumary
