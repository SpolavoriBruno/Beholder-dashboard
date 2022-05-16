import React, { useEffect, useRef, useState } from "react"
import SelectSymbol from "../../components/SelectSymbol/SelectSymbol"
import SwitchInput from "../../components/SwitchInput/SwitchInput"
import { saveMonitor, getMonitorTypes } from "../../services/MonitorService";
import MonitorIndexes from "./MonitorIndex"
import MonitorType from "./MonitorType"
import SelectInterval from "./SelectInterval"

/** 
 * props
 * - data
 * - onSubmit
 * - notify
 */
function MonitorModal(props) {
    const btnClose = useRef('')
    const btnSave = useRef('')

    const [monitorTypes, setMonitorTypes] = useState({})
    const [monitor, setMonitor] = useState({
        type: 'CANDLES',
    })

    function onSubmit(event) {
        const token = localStorage.getItem('token')
        saveMonitor(monitor.id, monitor, token)
            .then(result => {
                btnClose.current.click()
                if (props.onSubmit) props.onSubmit(result)
            }).catch(error => {
                props.notify({ type: 'error', text: error.response ? error.response.data : error.message })
                console.error(error)
            })
    }

    function onInputChange(event) {
        setMonitor(prevState => ({ ...prevState, [event.target.id]: event.target.value }))
    }

    useEffect(() => {
        getMonitorTypes(localStorage.getItem('token'))
            .then(types => {
                setMonitorTypes(types.getObject())
            })
    }, [])

    useEffect(() => {
        setMonitor(props.data)
    }, [props.data])

    return (<div className="modal fade" id="modalMonitor" tabIndex={-1} role="dialog" aria-labelledby="modalTitle">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="h5">
                        {monitor?.id ? "Edit Monitor" : "New Monitor"}
                    </h4>
                    <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6">
                                <MonitorType onChange={onInputChange} type={monitor.type} />
                            </div>
                            {
                                monitor.type !== monitorTypes.USER_DATA &&
                                <div className="col-6">
                                    <SelectSymbol onChange={onInputChange} symbol={monitor.symbol} onlyFavorites={false} label="Symbol" />
                                </div>
                            }
                        </div>
                        <div className="row mt-3">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="broadcastLabel">Broadcast Label <span data-bs-toggle="tooltip" data-bs-placement="top" title=""></span></label>
                                    <input type="text" className="form-control" id="broadcastLabel" placeholder="none" value={monitor.broadcastLabel || ''} onChange={onInputChange} />
                                </div>
                            </div>
                            {monitor.type === monitorTypes.CANDLES &&
                                <div className="col-6">
                                    <SelectInterval onChange={onInputChange} interval={monitor.interval} />
                                </div>
                            }
                        </div>
                        <div className="row mt-3">
                            {monitor.type === monitorTypes.CANDLES &&
                                <div className="col">
                                    <MonitorIndexes onChange={onInputChange} indexes={monitor.indexes} />
                                </div>
                            }
                        </div>
                        <div className="row mt-3">
                            <div className="col-6">
                                <SwitchInput text="Is Active?" id="isActive" onChange={onInputChange} isChecked={monitor.isActive} />
                            </div>
                            <div className="col-6">
                                <SwitchInput text="Logs" id="logs" onChange={onInputChange} isChecked={monitor.logs} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button ref={btnSave} type="button" className="btn btn-success btn-sm" onClick={onSubmit}>
                        <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default MonitorModal
