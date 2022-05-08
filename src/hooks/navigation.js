import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"

export function usePage() {
    const history = useHistory()
    const defaultLocation = useLocation()
    const [page, setPage] = useState(getPage())
    function getPage(location) {
        if (!location) location = defaultLocation
        return new URLSearchParams(location.search).get("page") || 1
    }
    useEffect(() => {
        return history.listen(location => {
            setPage(getPage(location))
        })
    }, [history])

    return [page, setPage]
}
