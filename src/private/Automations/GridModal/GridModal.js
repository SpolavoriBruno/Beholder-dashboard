import React, { useEffect, useRef, useState } from "react"
import SelectSymbol from "../../../components/SelectSymbol/SelectSymbol"
import SymbolPrice from "../../../components/SimbolPrice/SymbolPrice"
import SwitchInput from "../../../components/SwitchInput/SwitchInput"
import { notify } from "../../../components/Toast/Toast"
import WalletSumary from "../../../components/WalletSumary/WalletSumary"
import { saveAutomation } from "../../../services/AutomationService"
import { getBeholderIndexes } from "../../../services/BeholderService"
import { getSymbol } from "../../../services/SymbolService"


const DEFAULT_AUTOMATION = {
    conditions: '',
    schedule: '',
    actions: [],
    symbol: 'ETHBTC',
    name: '',
}

/**
 * props
 * - onSubmit
 */
function GridModal(props) {
    const btnClose = useRef('')
    const btnSave = useRef('')

    const [automation, setAutomation] = useState(DEFAULT_AUTOMATION)
    const [symbol, setSymbol] = useState(false)
    const [indexes, setIndexes] = useState([])
    const [isVisible, setIsVisible] = useState(false)

    function onSave() {
        const token = localStorage.getItem('token')
        delete automation.actions.id
        saveAutomation(automation.id, automation, token)
            .then(result => {
                btnClose.current.click()
                props.onSubmit && props.onSubmit(result)
            }).catch(error => {
                console.error(error.response)
                notify({ type: 'error', text: error.response ? error.response.data : error.message })
            })
    }

    function onInputChange(event) {
        const { id, value } = event.target
        setAutomation(prevState => ({ ...prevState, [id]: value }))
    }

    function onPriceChange(book) {
    }


    useEffect(() => {
        if (!automation.symbol) return

        const token = localStorage.getItem('token')
        getSymbol(automation.symbol, token).then(setSymbol)
    }, [automation.symbol])

    useEffect(() => {
        const modal = document.getElementById('modalGrid')

        modal.addEventListener('hidden.bs.modal', _ => setIsVisible(false))
        modal.addEventListener('show.bs.modal', _ => setIsVisible(true))
    }, [])

    useEffect(() => {
        setAutomation(props.data)
    }, [props.data])

    useEffect(() => {
        if (!automation?.symbol) return
        const token = localStorage.getItem('token')
        getBeholderIndexes(automation.symbol, token)
            .then(indexes => {
                const filteredIndexes = indexes.filter(index => index.symbol === automation.symbol)

                const baseWallet = indexes.filter(index => index.variable === 'WALLET' && automation.symbol.startsWith(index.symbol))
                if (baseWallet[0])
                    filteredIndexes.push(baseWallet[0])

                const quoteWallet = indexes.filter(index => index.variable === 'WALLET' && automation.symbol.endsWith(index.symbol))
                if (quoteWallet[0])
                    filteredIndexes.push(quoteWallet[0])

                setIndexes(filteredIndexes)
            })
    }, [automation.symbol])

    return (<div className="modal fade" id="modalGrid" tabIndex={-1} role="dialog" aria-labelledby="modalTitle" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="h4 modal-title" id="modalTitle">{props.data?.id ? 'Edit' : 'New'} Grid</h2>
                    <button ref={btnClose} type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <div className="row mb-3">
                            <div className="col-6 ">
                                <SelectSymbol onChange={onInputChange} onlyFavorites="false" symbol={automation.symbol} />
                            </div>
                            <div className="col-6 ">
                                {isVisible && <SymbolPrice symbol={automation.symbol} onChange={onPriceChange} />}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12">
                                <WalletSumary symbol={symbol} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12 ">
                                <label htmlFor="name">Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="name"
                                    placeholder="Strategy Name"
                                    required={true}
                                    value={automation.name}
                                    onChange={onInputChange}
                                />
                            </div>

                            <div className="row mt-3">
                                <div className="col-6">
                                    <SwitchInput text="Is Active?" id="isActive" onChange={onInputChange} isChecked={automation.isActive} />
                                </div>
                                <div className="col-6">
                                    <SwitchInput text="Logs" id="logs" onChange={onInputChange} isChecked={automation.logs} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button ref={btnSave} onClick={onSave} type="button" className="btn btn-success" >Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div >)
}

export default GridModal
