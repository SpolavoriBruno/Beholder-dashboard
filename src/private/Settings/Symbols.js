import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getSymbols, updateSymbol } from '../../services/SymbolService'

function Symbols() {
    const history = useHistory()
    const [symbols, setSymbols] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token')
        getSymbols(token)
            .then(symbols => setSymbols(symbols))
            .catch(error => {
                if (error?.response?.status === 401)
                    return history.push('/')
                console.error(error)
                setError(error.message)
                setSuccess(null)
            })
    }, [history])

    return (<React.Fragment>

    </React.Fragment>)
}

export default Symbols
