import React, { useEffect, useMemo, useState } from "react"

/**
 * props:
 * - wallet
 * - symbol
 */
function WalletSumary(props) {


    function getBaseAsset() {
        if (!props.wallet || !Array.isArray(props.wallet)) return 0

        const baseAsset = props.wallet.find(w => w.symbol === props.symbol?.base)

        if (!baseAsset) return 0

        return `${props.symbol.base}: ${baseAsset.available}`
    }

    function getQuoteAsset() {
        if (!props.wallet || !Array.isArray(props.wallet)) return 0

        const quoteAsset = props.wallet.find(w => w.symbol === props.symbol?.quote)

        if (!quoteAsset) return 0

        return `${props.symbol.quote}: ${quoteAsset.available}`
    }

    const walletSumary = useMemo(() => (
        <div className="row">
            <div className="col-md-6">
                <div className="alert alert-success py-1">
                    {getBaseAsset()}
                </div>
            </div>
            <div className="col-md-6">
                <div className="alert alert-info py-1">
                    {getQuoteAsset()}
                </div>
            </div>
        </div>
    ), [props.symbol, props.wallet])

    return walletSumary
}

export default WalletSumary
