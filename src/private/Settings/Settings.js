import React, { useEffect, useState, useRef } from "react"
import { useHistory } from "react-router-dom"

import { getSettings, updateSettings } from "../../services/SettingsService"
import Card from "./Card"
import Symbols from "./Symbols"

function Settings() {
    const history = useHistory()

    const inputEmail = useRef(null)
    const inputNewPassword = useRef(null)
    const inputConfirmNewPassword = useRef(null)
    const inputApiUrl = useRef(null)
    const inputStreamUrl = useRef(null)
    const inputAccessKey = useRef(null)
    const inputSecretKey = useRef(null)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    useEffect(() => {
        const token = localStorage.getItem('token')
        getSettings(token)
            .then(settings => {
                inputEmail.current.value = settings.email
                inputApiUrl.current.value = settings.apiUrl
                inputStreamUrl.current.value = settings.streamUrl
                inputAccessKey.current.value = settings.accessKey
            })
            .catch(error => {
                if (error?.response?.status === 401)
                    return history.push('/')
                setError(error?.response?.data)
            })
    }, [history])

    function onFormSubmit(event) {
        event.preventDefault()

        if (inputNewPassword?.current?.value !== inputConfirmNewPassword?.current?.value) {
            setError('As senhas não conferem')
            return
        }

        const token = localStorage.getItem('token')
        updateSettings({
            email: inputEmail.current.value,
            password: inputNewPassword.current.value || null,
            apiUrl: inputApiUrl.current.value,
            streamUrl: inputStreamUrl.current.value,
            accessKey: inputAccessKey.current.value,
            secretKey: inputSecretKey.current.value || null
        }, token)
            .then(result => {
                if (result) {
                    setError(null)
                    setSuccess('Settings updated successfully')

                    inputSecretKey.current.value = ''
                    inputNewPassword.current.value = ''
                    inputConfirmNewPassword.current.value = ''
                } else {
                    setSuccess(null)
                    setError('Cant update settings')
                }
            })
            .catch(error => {
                console.error(error)
                setError(error?.response?.data || 'Cant update settings')
            })
    }

    return (<React.Fragment>
        <main className="content">
            <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
                <h1 className="h4 mb-0">Settings</h1>
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={onFormSubmit}>
                        <div className="d-flex justify-content-center flex-wrap flex-md-nowrap">
                            {
                                error &&
                                <div className="alert alert-danger text-center mt-2 col-9 py-2">{error}</div>
                            }
                            {
                                success && <div className="alert alert-success text-center mt-2 col-9 py-2">{success}</div>
                            }
                        </div>
                        <div className="d-flex justify-content-center flex-wrap flex-md-nowrap">
                            <Card title="General Info">
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input ref={inputEmail} className="form-control" id="email" type="email" placeholder="Email" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="newPassword">New Password</label>
                                            <input ref={inputNewPassword} className="form-control" id="newPassword" type="password" placeholder="New Password" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <input ref={inputConfirmNewPassword} className="form-control" id="confirmPassword" type="password" placeholder="Confirm Password" />
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card title="API Settings">
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="apiUrl">API URL</label>
                                            <input ref={inputApiUrl} className="form-control" id="apiUrl" type="text" placeholder="API URL" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="streamUrl">STREAM URL</label>
                                            <input ref={inputStreamUrl} className="form-control" id="streamUrl" type="text" placeholder="STREAM URL" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="accessKey">Access Key</label>
                                            <input ref={inputAccessKey} className="form-control" id="accessKey" type="text" placeholder="ACCESS KEY" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="secretKey">Secret Key</label>
                                            <input ref={inputSecretKey} className="form-control" id="secretKey" type="password" placeholder="Update Secret Key" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Symbols />
            </div>
        </main>

    </React.Fragment>)
}

export default Settings
