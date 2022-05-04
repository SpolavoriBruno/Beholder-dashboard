import React, { useEffect, useState } from "react"

/** 
 * props:
 * - data
 * - onEdit
 * - onStop
 * - onStart
 * - onDelete
 */
function MonitorRow(props) {
    const [monitor, setMonitor] = useState({})

    function getActiveClass(isActive) {
        return isActive ? 'badge bg-success' : 'badge bg-danger'
    }

    function getActiveText(isActive) {
        return isActive ? 'Running' : 'Stopped'
    }

    useEffect(() => {
        setMonitor(props.data)
    }, [props.data])

    return (<tr>
        <td>
            {monitor.type}

        </td>
        <td>
            {monitor.symbol || '*'}
            {monitor.interval && `_${monitor.interval}`}
        </td>
        <td>
            <span className={getActiveClass(monitor.isActive)}>
                {getActiveText(monitor.isActive)}
            </span>
        </td>
        <td>{
            !monitor.isSystemMon &&
            <button
                className="btn btn-xs btn-tertiary ms-2"
                id={`edit/${monitor.id}`}
                title="Edit Monitor"
                onClick={props.onEdit}
                data-bs-toggle="modal"
                data-bs-target="#modalMonitor"
            >
                <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
        }{
                !monitor.isSystemMon && monitor.isActive &&
                <button
                    className="btn btn-xs btn-danger ms-2"
                    id={`stop/${monitor.id}`}
                    title="Stop Monitor"
                    onClick={props.onStop}
                >
                    <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            }{
                !monitor.isSystemMon && !monitor.isActive &&
                <button
                    className="btn btn-xs btn-success ms-2"
                    id={`start/${monitor.id}`}
                    title="Start Monitor"
                    onClick={props.onStart}
                >
                    <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            }{
                !monitor.isSystemMon && !monitor.isActive &&
                <button
                    className="btn btn-xs btn-danger ms-2"
                    id={`delete/${monitor.id}`}
                    title="Delete Monitor"
                    onClick={props.onDelete}
                >
                    <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            }{
                monitor.isSystemMon &&
                <span className="badge bg-primary align-middle mx-2 px-3 py-2" title="Cant edit System Monitors">System Monitor</span>
            }</td>
    </tr>)
}

export default MonitorRow
