import React, { useEffect, useRef, useState } from "react"
import SelectSymbol from "../../../components/SelectSymbol/SelectSymbol"
import SwitchInput from "../../../components/SwitchInput/SwitchInput"
import { saveAutomation } from "../../../services/AutomationService"
import ActionsArea from "./ActionsArea/ActionsArea"
import ConditionsArea from "./ConditionsArea/ConditionsArea"

/**
 * props
 * -
 */
function AutomationModal(props) {
    const btnClose = useRef('')
    const btnSave = useRef('')

    const [error, setError] = useState('')
    const [automation, setAutomation] = useState({})
    const [indexes, setIndexes] = useState([])

    function onSave() {
        const token = localStorage.getItem('token')
        saveAutomation(automation.id, automation, token)
            .then(result => {
                btnClose.current.click()
                if (props.onSubmit) props.onSubmit(result)
            }).catch(error => {
                setError(error.response ? error.response.data : error.message)
                console.error(error.response ? error.response.data : error.message)
            })
    }

    function onInputChange(event) {
        const { id, value } = event.target
        setAutomation(prevState => ({ ...prevState, [id]: value }))
    }

    useEffect(() => {
        setAutomation(props.data)
    }, [props.data])

    useEffect(() => {
        if (!automation || !automation.symbol) return
        const token = localStorage.getItem('token')
        getBeholderMemory(automation.symbol, token)
            .then()
    }, [automation.symbol])

    return (<div className="modal fade" id="modalAutomation" tabIndex={-1} role="dialog" aria-labelledby="modalTitle" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="h4 modal-title" id="modalTitle">{props.data?.id ? 'Edit' : 'New'} Automation</h2>
                    <button ref={btnClose} type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <div className="row mb-3">
                            <div className="col-6 ">
                                <SelectSymbol onChange={onInputChange} onlyFavorites="false" symbol={automation.symbol} />
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
                        </div>
                        <ul className="nav nav-tabs" id="tabs" role="tablist">
                            <li className="nav-item">
                                <button className="nav-link active py-2 mb-1" type="button" id="conditions-tab" data-bs-toggle="tab" data-bs-target="#conditions" role="tab" aria-controls="conditions" aria-selected="true">
                                    Conditions
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link py-2 mb-1" type="button" id="actions-tab" data-bs-toggle="tab" data-bs-target="#actions" role="tab" aria-controls="actions" aria-selected="true">
                                    Actions
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content px-3 mb-3" id="tabContent">
                            <div className="tab-pane fade show active" id="conditions" role="tabpanel" aria-labelledby="conditions-tab">
                                <ConditionsArea indexes={indexes} condition={automation.condition} symbol={automation.symbol} onChange={onConditionChange} />
                            </div>
                            <div className="tab-pane fade" id="actions" role="tabpanel" aria-labelledby="actions-tab">
                                <ActionsArea />
                            </div>
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
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <button ref={btnSave} onClick={onSave} type="button" className="btn btn-success" >Save</button>
                </div>
            </div>
        </div>
    </div>)
}

export default AutomationModal
