import React, { useEffect, useState } from "react"
import ActionBadge from "./ActionBadge"
import ActionsType from "./ActionType"

const DEFAULT_ACTION = {
    type: 'ALERT_EMAIL',

}

/**
 * props
 * - actions
 * - onChange
 */
function ActionsArea(props) {

    const [newAction, setNewAction] = useState(DEFAULT_ACTION)
    const [actions, setActions] = useState([])

    function onInputChange(event) {
        const { id, value } = event.target
        setNewAction(prevState => ({ ...prevState, [id]: value }))
    }

    function onAddAction(event) {
        const arealyExists = actions.some(action => action.type === newAction.type)
        if (arealyExists) return

        actions.push(newAction)
        setActions(actions)
        props.onChange && props.onChange({ target: { id: 'actions', value: actions } })
        // setActions(prevState => {
        //     return [...prevState, newAction]
        // })
        setNewAction(DEFAULT_ACTION)
    }

    function onRemoveAction(event) {
        const index = actions.find(a => a.id === event.target.id)
        actions.splice(index, 1)
        props.onChange && props.onChange({ target: { id: 'actions', value: actions } })
    }

    useEffect(() => {
        setActions(props.actions || [])
        setNewAction(DEFAULT_ACTION)
    }, [props.actions])

    return (<>
        <div className="row">
            <div className="col-12">
                <div className="input-group input-group-merge my-2">
                    <ActionsType type={newAction.type} onChange={onInputChange}></ActionsType>
                    <button className="btn btn-secondary px-2" type="button" onClick={onAddAction}>
                        <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        {
            actions && actions.length > 0 &&
            <div className="divScrollBadges">
                <div className="d-inline-flex flex-row align-content-start">
                    {actions.map(action => (
                        <ActionBadge key={`${action.type}:${action.id}`} action={action} onRemove={onRemoveAction} ></ActionBadge>
                    ))}
                </div>
            </div>
        }
    </>)
}

export default ActionsArea
