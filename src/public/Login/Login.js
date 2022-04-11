import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"

import { doLogin } from '../../services/AuthService'

function Login() {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState()

    function onChangeInput(event) {
        if (event.target.id === "email") {
            setEmail(event.target.value)
        } else {
            setPassword(event.target.value)
        }
    }

    function onSubmit(event) {
        event.preventDefault()


        doLogin(email, password)
            .then(() => {
                history.push("/settings")
            })
            .catch(() => {
                setError("Invalid credentials")
            })
    }

    return (
        <main>
            <section className="vh-lg-100 mt-5  mt-lg-0 bg-soft d-flex align-items-center">
                <div className="container">
                    <p className="text-center">
                        <Link to="/" className="d-flex align-items-center justify-content-center">
                            <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20">
                                <path></path>
                            </svg>
                            Back to Homepage
                        </Link>
                    </p>
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="bg-white shadow border-0 rounded border-ligth p-4 p-lg-5 w-100 fmxw-500">
                            <div className="text-center">
                                <img src="/img/favicon/logo-192.png" alt="Beholder" width={64} />
                            </div>
                            <div className="text-center text-md-center mb-4 md-mt-0">
                                <h1 className="mb-0 h3">Sign to our plataform</h1>
                            </div>
                            <form action="#" className="mt-4" onSubmit={onSubmit}>
                                <div className="form-group mb-4">
                                    <label htmlFor="email">Your Email</label>
                                    <div className="input-group">
                                        <span className="input-group-text" id="basic-addon-1">
                                            <svg className="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path></path>
                                            </svg>
                                        </span>
                                        <input type="email" className="form-control" placeholder="example@domain.com" id="email" autoFocus required onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="password">Your password</label>
                                    <div className="input-group">
                                        <span className="input-group-text" id="basic-addon-2">
                                            <svg className="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path></path>
                                            </svg>
                                        </span>
                                        <input type="password" className="form-control" placeholder="Password" id="password" required onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="remember" />
                                        <label className="form-check-label mb-0" htmlFor="remember">Remember</label>
                                    </div>
                                    <div><Link to="/forgot-password">Lost password?</Link></div>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-gray-800">Sign in</button>
                                </div>
                                {
                                    error ?
                                        <div className="alert alert-danger mt-2 text-center" role="alert">
                                            {error}
                                        </div>
                                        : <React.Fragment></React.Fragment>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )

}

export default Login
