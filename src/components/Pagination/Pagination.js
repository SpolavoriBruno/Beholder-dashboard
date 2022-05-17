import React from "react"
import { Link } from "react-router-dom"

import { useQuery } from "../../utils/query"

const PAGE_SIZE = 10
const PAGES = 3
/** 
 * Props:
 * - count
 */
function Pagination(props) {
    const query = useQuery()
    const pageQty = Math.ceil(props.count / PAGE_SIZE)
    const pages = []

    for (let i = 1; i <= pageQty; i++)
        pages.push(i)

    function getPageClass(page) {
        const queryPage = query.get("page")
        const isActive = queryPage == page || (!queryPage && page == 1)

        return isActive ? 'page-item active' : 'page-item'
    }

    function getPageLink(page) {
        return `${window.location.pathname}?page=${page}`
    }

    return (
        <div className="card-footer px-3 border-0 d-flex flex-collumn flex-lg-row align-items-center justify-content-between">
            <nav aria-label="Page Navigation">
                <ul className="pagination mb-0">
                    {
                        pages.map(page => {
                            const queryPage = query.get("page") || 1

                            if (pages.length > 10) {

                                if (page !== 1 && page !== pages.length && (page < queryPage - PAGES || page > +queryPage + PAGES))
                                    return null
                            }
                            return (
                                <li key={page} className={getPageClass(page)}>
                                    <Link className="page-link" to={getPageLink(page)}>{page}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
            <div className="fw-normal small my-3">
                <b>
                    {props.count} Results
                </b>
            </div>
        </div>
    )
}

export default Pagination
