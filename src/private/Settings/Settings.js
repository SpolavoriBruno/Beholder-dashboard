import React, { useEffect, useState, useRef } from "react"

import { getSettings, updateSettings } from "../../services/SettingsService"
import Toast from "../../components/Toast/Toast"
import Card from "./Card"
import Symbols from "./Symbols"

function Settings() {
    const confirmPassword = useRef(null)

    const [settings, setSettings] = useState({})
    const [notification, setNotification] = useState({})

    function onInputChange(event) {
        const { id, value } = event.target
        setSettings(prevSettings => ({ ...prevSettings, [id]: value }))
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        getSettings(token)
            .then(settings => {
                setSettings(settings)
            })
            .catch(error => {
                setNotification({ type: 'error', text: error.response ? error.response.data : error.message })
            })
    }, [])

    function onSave() {
        if ((settings.password || confirmPassword.current.value)
            && settings.password !== confirmPassword.current.value)
            return setNotification({ type: 'error', text: 'The passwords do not match' })

        const token = localStorage.getItem('token')
        updateSettings(settings, token)
            .then(result => {
                if (result) {
                    setNotification({ type: 'success', text: 'Settings updated successfully' })
                } else {
                    setNotification({ type: 'error', text: 'Cant update settings' })
                }
            })
            .catch(error => {
                console.error(error)
                setNotification({ type: 'error', text: error.response ? error.response.data : 'Cant update settings' })
            })
    }

    return (<React.Fragment>
        <main className="content">
            <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
                <h1 className="h4 mb-0">Settings</h1>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-center flex-wrap">
                        <Card title="Personal Settings" onSubmit={onSave}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input className="form-control" id="email" type="email"
                                            placeholder="Email" defaultValue={settings.email} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="password">New Password</label>
                                        <input className="form-control" id="password" type="password"
                                            placeholder="New Password" onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input ref={confirmPassword} className="form-control" id="confirmPassword" type="password"
                                            placeholder="Confirm Password" onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="phone">Cellphone</label>
                                        <input className="form-control" id="phone" type="tel"
                                            placeholder="+5544987654321" defaultValue={settings.phone} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card title="Exchange Settings" onSubmit={onSave}>
                            <div className="row">
                                <div className="col-sm-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="apiUrl">API URL</label>
                                        <input className="form-control" id="apiUrl" type="text"
                                            placeholder="API URL" defaultValue={settings.apiUrl} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="streamUrl">STREAM URL</label>
                                        <input className="form-control" id="streamUrl" type="text"
                                            placeholder="STREAM URL" defaultValue={settings.streamUrl} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="accessKey">Access Key</label>
                                        <input className="form-control" id="accessKey" type="text"
                                            placeholder="ACCESS KEY" defaultValue={settings.accessKey} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="secretKey">Secret Key</label>
                                        <input className="form-control" id="secretKey" type="password"
                                            placeholder="Update Secret Key" onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card title="Notification Settings" width="49rem" onSubmit={onSave}>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="sendgridKey">Sendgrid Key</label>
                                        <input className="form-control" id="sendgridKey" type="password"
                                            placeholder="Sendgrid API Key" onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="twilioSid">Twilio Sid</label>
                                        <input className="form-control" id="twilioSid" type="text"
                                            placeholder="Twilio Sid" defaultValue={settings.twilioSid} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="twilioToken">Twilio Token</label>
                                        <input className="form-control" id="twilioToken" type="password"
                                            placeholder="Twilio Token" onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="twilioPhone">Twilio Phone</label>
                                        <input className="form-control" id="twilioPhone" type="tel"
                                            placeholder="+5544987654321" defaultValue={settings.twilioPhone} onChange={onInputChange} />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Symbols />
            </div>
        </main>
        <Toast type={notification.type} text={notification.text} />
    </React.Fragment>)
}

export default Settings
