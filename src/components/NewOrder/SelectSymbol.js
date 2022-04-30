import React, { useState, useEffect, useMemo, useRef } from "react"
import { getSymbols } from "../../services/SymbolService"

const STAR_COLOR = '#ffc107'

/**
 * props:
 * - onChange
 * - symbol
 * - disabled
 * - onlyFavorites
 */
function SelectSymbol(props) {
    const [symbols, setSymbols] = useState(['Loading...'])
    const [onlyFavorites, setOnlyFavorites] = useState(props.onlyFavorites ? props.onlyFavorites : true)
    const [starColor, setStarColor] = useState(STAR_COLOR)

    const selectRef = useRef('')
    const buttonRef = useRef('')

    function onFavoriteClick() {
        setOnlyFavorites(!onlyFavorites)
        setStarColor(!onlyFavorites ? STAR_COLOR : 'white')
    }

    useEffect(() => {
        selectRef.current.value = props.symbol || 'BTCUSDT'
        buttonRef.current.disabled = selectRef.current.disabled = props.disabled
    }, [props.symbol, props.disabled])

    useEffect(() => {
        const token = localStorage.getItem('token')
        getSymbols(token)
            .then(symbols => {
                const symbolsName = onlyFavorites
                    ? symbols.filter(s => s.isFavorite).map(s => s.symbol)
                    : symbols.map(s => s.symbol)

                if (symbolsName.length) {
                    setSymbols(symbolsName)
                    const value = selectRef.current.value = props.symbol || symbolsName[0]
                    props.onChange({ target: { id: 'symbol', value } })
                }
                else setSymbols('No symbols')
            })
            .catch(console.error)

    }, [onlyFavorites])

    const selectSymbol = useMemo(() => (
        <div className="form-group">
            {
                props.label &&
                <label htmlFor="symbol">{props.label}</label>
            }
            <div className="input-group">
                <button ref={buttonRef} type="button" className="btn btn-secondary d-inline-flex align-items-center" onClick={onFavoriteClick}>
                    <svg className="icon icon-xs" fill={starColor} stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                </button>
                <select ref={selectRef} id="symbol" className="form-select" onChange={props.onChange}>
                    {symbols.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
        </div>
    ), [starColor, props.onChange, symbols])

    return selectSymbol
}

export default SelectSymbol
