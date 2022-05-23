import React, { useEffect, useState } from "react"
import { getOrderTemplates } from "../../../../services/OrderTemplateService"
import ActionBadge from "./ActionBadge"
import ActionsType from "./ActionType"

const DEFAULT_ACTION = {
    type: 'ALERT_EMAIL',
    orderTemplateId: null,
}

/**
 * props
 * - actions
 * - onChange
 * - notify
 */
function ActionsArea(props) {

    const [newAction, setNewAction] = useState(DEFAULT_ACTION)
    const [actions, setActions] = useState([])
    const [orderTemplates, setOrderTemplates] = useState([])

    function onInputChange(event) {
        if (event.target.id === 'orderTemplateId') {
            const orderTemplateId = parseInt(event.target.value);
            const orderTemplate = orderTemplates.find(ot => ot.id === orderTemplateId);
            if (!orderTemplate) return;

            setNewAction(prevState => ({
                ...prevState,
                orderTemplateName: orderTemplate.name,
                orderTemplateId
            }));
        } else setNewAction(prevState => ({ ...prevState, [event.target.id]: event.target.value }));

        if (props.onChange) props.onChange(event);
    }

    function onAddAction() {
        let alreadyExists

        if (newAction.type === 'ORDER') {
            if (!newAction.orderTemplateId) return;
            newAction.id = newAction.orderTemplateId;
            alreadyExists = actions.some(a => a.id === newAction.id);
        }
        else if (newAction.type === 'WITHDRAW') {
            if (!newAction.withdrawTemplateId) return;
            newAction.id = newAction.withdrawTemplateId;
            alreadyExists = actions.some(a => a.id === newAction.id);
        }
        else {
            newAction.id = newAction.type;//temp id
            alreadyExists = actions.some(a => a.type === newAction.type);
        }

        if (alreadyExists) return;

        actions.push(newAction);
        setActions(actions);
        if (props.onChange) props.onChange({ target: { id: 'actions', value: actions } });
    }

    function onRemoveAction({ target: { id } }) {
        const index = actions.findIndex(a => a.id == id.split('/')[1])
        actions.splice(index, 1)
        if (props.onChange) props.onChange({ target: { id: 'actions', value: actions } });
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        getOrderTemplates(props.symbol, null, token)
            .then(result => setOrderTemplates(result.rows))
            .catch(error => {
                console.error(error.response ? error.response.data : error)
            })
    }, [props.symbol])

    useEffect(() => {
        setActions(props.actions || [])
        setNewAction(DEFAULT_ACTION)
    }, [props.actions])

    return (<>
        <div className="row">
            <div className="col-12">
                <div className="input-group input-group-merge my-2">
                    <ActionsType type={newAction.type} onChange={onInputChange}></ActionsType>

                    {newAction.type === "ORDER" && Array.isArray(orderTemplates) &&
                        <select id="orderTemplateId" className="form-select" onChange={onInputChange}>
                            <option value="" hidden>Select Order Template</option>
                            {orderTemplates.map(orderTemplate => (
                                <option key={orderTemplate.id} value={orderTemplate.id}>{orderTemplate.name}</option>
                            ))}
                        </select>
                    }

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
                    {Array.isArray(actions) && actions.map(action => (
                        <ActionBadge
                            key={`${action.type}:${action.id ? action.id : action.orderTemplateId}`}
                            action={action} onRemove={onRemoveAction}
                        ></ActionBadge>
                    ))}
                </div>
            </div>
        }
    </>)
}

export default ActionsArea
