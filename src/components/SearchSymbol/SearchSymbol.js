import React from "react"
function SearchSymbol(props) {
    return (
        <form className="navbar-search form-inline" id="navbar-search-main">
            <div className="input-group input-group-merge search-bar">
                <span className="input-group-text" id="topbar-addon">
                    <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input type="text" className="form-control" id="search" placeholder={props.placeholder} onChange={props.onChange} />
            </div>
        </form>
    )
}

export default SearchSymbol
