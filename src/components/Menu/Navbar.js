import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (<React.Fragment>
        <nav className='navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none'>
            <Link className='navbar-brand me-lg-5' to='/'>
                <img className='navbar-brand-light' src='/img/favicon/logo-512.png' alt='Beholder Logo' />
            </Link>

            <div className='d-flex align-items-center'>
                <button
                    className="navbar-toggler d-lg-none collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    </React.Fragment>)
}

export default Navbar
