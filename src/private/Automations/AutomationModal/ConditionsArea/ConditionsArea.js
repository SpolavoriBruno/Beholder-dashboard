import React, { useEffect, useState } from "react"
import SmartBadge from "../../../../components/SmartBadge/SmartBadge"
import IndexSelect from "./IndexSelect"
import VariableInput from "./VariableInput"

/**
 * props
 * - indexes
 * - symbol
 * - conditions
 * - onChange
 * - notify
 */
function ConditionsArea(props) {
    const [indexes, setIndexes] = useState([])
    const [conditions, setConditions] = useState([])
    const [selectedIndex, setSelectedIndex] = useState({})

    function onKeySelectChange(event) {
        const item = props.indexes.find(index => index.eval === event.target.value)
        if (item) setSelectedIndex(item)
    }

    function onAddCondition(event) {
        const { value } = event.target
        const parsedCondition = parseConditions(value.eval)[0]

        if (conditions.some(c => c.eval === parsedCondition.eval)) return

        conditions.push(parsedCondition)

        if (!props.onChange) return

        props.onChange({
            target: {
                id: "conditions",
                value: conditions.map(c => c.eval).join(" && ")
            }
        })

        props.onChange({
            target: {
                id: "indexes",
                value: parseIndexes(conditions)
            }
        })
        setConditions([...conditions])
    }

    function onRemoveCondition(event) {
        const id = event.target.id.split("/")[1]
        const pos = conditions.findIndex(c => c.eval === id)
        conditions.splice(pos, 1)

        if (!props.onChange) return

        props.onChange({
            target: {
                id: 'conditions',
                value: conditions.map(c => c.eval).join(" && ")
            }
        })

        props.onChange({
            target: {
                id: 'indexes',
                value: parseIndexes(conditions)
            }
        })
    }

    function parseIndexes(conditionsArray) {
        const indexesStr = conditionsArray
            .map(condition =>
                condition.eval.split(/[=><!]/)
                    .filter(str => str.startsWith("MEMORY"))
                    .map(str => str.split('.')[0])
                    .join(',')
            )
            .join(',')
            .replaceAll("MEMORY['", "")
            .replaceAll("']", "")

        return [...new Set(indexesStr.split(','))].join(',')
    }

    function parseConditions(conditionsText) {
        if (!conditionsText) return []

        const split = conditionsText.split("&&")

        return split.map(item => {
            const text = item
                .replaceAll("MEMORY['", "")
                .replaceAll("']", "")
                .replaceAll("==", "=")
                .replaceAll(".current", "")
                .replaceAll(`${props.symbol}:`, "")
                .trim()

            return {
                eval: item.trim(),
                text
            }
        })
    }

    useEffect(() => {
        setIndexes(props.indexes)
    }, [props.indexes])

    useEffect(() => {
        setSelectedIndex({})
    }, [props.symbol])

    useEffect(() => {
        setConditions(parseConditions(props.conditions))
    }, [props.conditions])

    return (<>
        <div className="row">
            <div className="col-12">
                <IndexSelect indexes={indexes} onChange={onKeySelectChange} />
                <VariableInput indexes={indexes} selectedIndex={selectedIndex} onAdd={onAddCondition} notify={props.notify} />
            </div>
        </div>
        {conditions.length > 0 &&
            <div className="divScrollBadges">
                <div className="d-inline-flex flex-row align-content-start">
                    {conditions.map((condition, i) => (
                        <SmartBadge key={i} id={condition.eval} text={condition.text} onRemove={onRemoveCondition} />
                    ))}
                </div>
            </div>
        }
    </>)
}

export default ConditionsArea
