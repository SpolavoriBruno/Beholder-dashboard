import { Link } from 'react-router-dom'
function SidebarItem(props) {
    function getClassName(itemName) {
        const componentClass = 'nav-item d-flex justify-content-center '

        return window.location.pathname === itemName ? componentClass + 'active' : componentClass
    }

    return (
        <li className={getClassName(props.to)}>
            <Link to={props.to} className="nav-link" onClick={props.onClick}>
                {props.children}
                <span className="sidebar-text">{props.text}</span>
            </Link>
        </li>
    )
}

export default SidebarItem
