import React, { useEffect, useState } from "react"
import IndexSelect from "./IndexSelect"

/**
 * props
 * - indexes
 * - symbol
 * - conditions
 * - onChange
 */
function ConditionsArea(props) {
    const [indexes, setIndexes] = useState([])

    function onKeySelectChange(event) {
        console.log(event)
    }

    useEffect(() => {
        setIndexes(props.indexes)
    }, [props.indexes])

    return (<div className="row mt-3">
        <div className="col-12">
            <IndexSelect onChange={onKeySelectChange} />
        </div>
    </div>)
}

export default ConditionsArea
