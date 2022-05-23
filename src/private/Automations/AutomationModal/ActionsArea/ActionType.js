import React, { useEffect, useState } from "react"

/**
 * props
 * - type
 * - onChange
 */
function ActionsType(props) {
    const [type, setType] = useState(props.type)
    useEffect(() => {
        setType(props.type)
    }, [props.type])

    return (<select id="type" className="form-select" value={type} onChange={props.onChange}>
        <option value="ALERT_EMAIL">Alert Email</option>
        <option value="ALERT_SMS">Alert SMS</option>
        <option value="ORDER">Place Order</option>
        <option value="ALERT_TELEGRAM" disabled>Alert Telegram</option>
        <option value="ALERT_SLACK" disabled>Alert Slack</option>
        <option value="ALERT_PUSH" disabled>Alert Push</option>
        <option value="ALERT_WEBHOOK" disabled>Webhook</option>
    </select>)
}

export default ActionsType
