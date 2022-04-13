import { Link } from 'react-router-dom'


function SidebarItem(props) {
    function getClassName(itemName, className) {
        let cn = window.location.pathname === itemName ? 'nav-item active' : 'nav-item'
        cn += ` ${className}`
        return cn
    }

    return (
        <li className={getClassName(props.to, props.className)}>
            <Link to={props.to} className="nav-link" onClick={props.onClick}>
                {props.children}
                <span className="sidebar-text">{props.text}</span>
            </Link>
        </li>
    )
}

export default SidebarItem
