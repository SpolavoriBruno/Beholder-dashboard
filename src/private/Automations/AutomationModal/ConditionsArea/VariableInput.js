import React, { useEffect, useRef, useState } from "react"

/**
 * props:
 * - selectedIndex
 * - indexes
 * - onAdd
 */
function VariableInput(props) {
    const variableRef = useRef('')

    const [indexes, setIndexes] = useState([])
    const [index, setIndex] = useState({
        example: "",
    })
    const [variable, setVariable] = useState()
    const [operator, setOperator] = useState('==')

    function onOperatorChange(event) {
        setOperator(event.target.value)
    }

    function onVariableChange(event) {
        const { value } = event.target
        const ix = indexes.find(index => value.endsWith(index.variable))

        if (ix && !value.endsWith("WALLET")) {
            setVariable(ix.eval)
        } else {
            setVariable(value)
        }
    }

    function getExpression() {
        const value = typeof index.example === "string" ? `'${variable}'` : variable
        return { text: `${index.symbol}:${index.variable} ${operator.replace('==', '=')} ${value}`, value }
    }

    function onAddClick() {
        if (!index.eval || !operator || !variable) {
            props.setError("Please fill in all fields")
            return
        }
        props.setError('')
        const { text, value } = getExpression()
        const condition = {
            eval: `${index.eval}${operator}${value}`,
            text
        }

        props.onAdd({ target: { id: "condition", value: condition } })
    }

    function getVariableText(index) {
        return index.variable === "WALLET" ? `${index.symbol}:${index.variable}` : index.variable
    }

    useEffect(() => {
        setIndex(props.selectedIndex)
        variableRef.current.value = ''
    }, [props.selectedIndex])

    useEffect(() => {
        setIndexes(props.indexes)
    }, [props.indexes])

    return (
        <div className="input-group input-group-merge mb-2">
            <span className="input-group-text bg-secondary">is</span>
            <select id="operator" className="form-select" onChange={onOperatorChange} defaultValue="">
                {typeof index.example === 'number' &&
                    <>
                        <option value=">">greater than</option>
                        <option value=">=">greater or equal</option>
                        <option value="<">less than</option>
                        <option value="<=">less or equal</option>
                    </>
                }
                <option value="" hidden>Select an operator</option>
                <option value="==">equals</option>
                <option value="!=">not equals</option>
            </select>
            <input
                ref={variableRef}
                className="form-control"
                type="text"
                id="variable"
                list="variables"
                placeholder={`e.g. ${index.example}`}
                onChange={onVariableChange}
                title="Or duble click to select an Index"
            />
            <datalist id="variables">
                {indexes && Array.isArray(indexes) && indexes
                    .filter(i => i.eval !== index.eval)
                    .map(i => (
                        <option key={`${i.symbol}:${i.variable}`} value={getVariableText(i)}>
                            {getVariableText(i)}
                        </option>
                    ))
                }
            </datalist>
            <button className="btn btn-secondary px-2" type="button" onClick={onAddClick}>
                <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    )
}

export default VariableInput
