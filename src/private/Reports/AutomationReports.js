import React, { useEffect, useState } from "react"

export default function AutomationReports({ data }) {

    const [automations, setAutomations] = useState([])

    useEffect(() => {
        if (!data) return
        setAutomations(data)
    }, [data])

    return (<div className="col mb-4">
        <div className="card border-0 shadow">
            <div className="card-header">
                <h2 className="fs-5 fw-bold mb-0">Automations</h2>
            </div>
            <div className="table-responsive divScroll">
                <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                    <thead className="thead-light">
                        <tr>
                            <th className="border-bottom" scope="col">Name</th>
                            <th className="border-bottom" scope="col">Exec.</th>
                            <th className="border-bottom" scope="col">Net</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(automations) && automations.map(item => (
                            <tr key={`wallet/${item.name}`}>
                                <td className="text-gray-900">{item.name}</td>
                                <td className="text-gray-900">{item.executions}</td>
                                <td className="text-gray-900">{item.net.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>)
}
