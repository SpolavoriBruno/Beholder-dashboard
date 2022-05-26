import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"

/**
 * @param {object} Object contain text and type.
 */
export let notify

/**
 * @param {object} Object contain text and type.
 * Alternatively, you can import 'notify' from same module.
 */
function Toast({ type, text }) {
    const DEFAULT_NOTIFICATION = {
        type: '',
        text: ''
    }

    const [notification, setNotification] = useState(DEFAULT_NOTIFICATION)

    useEffect(() => {
        notify = setNotification
    }, [])

    useEffect(() => {
        if (!notification.text) return

        const notyf = new window.Notyf({
            position: {
                x: 'right',
                y: 'top'
            },
            duration: 7000,
            type: [{
                type: 'info',
                background: '#00bfff',
                dismissible: true,
            }, {
                type: 'error',
                background: '#ff0000',
                dismissible: true,
            }, {
                type: 'success',
                background: '#00ff00',
                dismissible: true,
            }]
        })

        notyf.open({
            type: notification.type,
            message: notification.text
        })
        setNotification(DEFAULT_NOTIFICATION)
    }, [notification])

    useEffect(() => {
        setNotification({ type, text })
    }, [type, text])

    const { lastJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
        onOpen: () => console.info('WebSocket connected to notifications'),
        onMessage: () => {
            if (lastJsonMessage && lastJsonMessage.notification) {
                setNotification(lastJsonMessage.notification)
            }
        },
        queryParams: { 'token': localStorage.getItem('token') },
        onError: (error) => {
            console.error(error)
            setNotification({ type: 'error', text: JSON.stringify(error) })
        },
        shouldReconnect: () => true,
        reconnectInterval: 2500,
    })
}

export default Toast
