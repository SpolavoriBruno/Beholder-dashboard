import React from "react"

/**
 * props
 * - type
 * - onChange
 */
function ActionsType(props) {
    return (<select id="type" className="form-select" onChange={props.onChange}>
        <option value="ORDER">Place Order</option>
        <option value="ALERT_EMAIL">Alert Email</option>
        <option value="ALERT_SMS">Alert SMS</option>
        <option value="ALERT_PUSH">Alert Push</option>
        <option value="ALERT_WEBHOOK">Alert Webhook</option>
        <option value="ALERT_SLACK">Alert Slack</option>
        <option value="ALERT_TELEGRAM">Alert Telegram</option>
    </select>)
}

export default ActionsType
