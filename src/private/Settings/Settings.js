import React from "react"
import { Link, useHistory } from "react-router-dom"

function Settings() {
    return (
        <main>
            <section className="vh-lg-100 mt-5  mt-lg-0 bg-soft d-flex align-items-center">
                <div className="container">
                    <p className="text-center">
                        <Link to="/" className="d-flex align-items-center justify-content-center">
                            <svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20">
                                <path></path>
                            </svg>
                            Settings
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    )

}

export default Settings
