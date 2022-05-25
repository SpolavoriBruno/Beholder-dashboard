import React from "react"
import { Route, BrowserRouter, Redirect } from "react-router-dom"

import Automations from "./private/Automations/Automations"
import Dashboard from "./private/Dashboard/Dashboard"
import Login from "./public/Login/Login"
import Orders from "./private/Orders/Orders"
import OrderTemplates from "./private/OrderTemplates/OrderTemplates"
import Settings from "./private/Settings/Settings"
import Monitors from "./private/Monitors/Monitors"
import Menu from "./components/Menu/Menu"
import Toast from "./components/Toast/Toast"

function Routes() {
    function PrivateRoute({ children, ...rest }) {
        return (
            <Route {...rest} render={() => {
                return localStorage.getItem('token')
                    ? <><Menu />{children}<Toast /></>
                    : <Redirect to='/' />
            }} />
        )
    }

    return (
        <BrowserRouter>
            <Route path="/" exact>
                <Login />
            </Route>

            <PrivateRoute path="/automations" >
                <Automations />
            </PrivateRoute>

            <PrivateRoute path="/monitors" >
                <Monitors />
            </PrivateRoute>

            <PrivateRoute path="/dashboard" >
                <Dashboard />
            </PrivateRoute>

            <PrivateRoute path="/orders/:symbol?" >
                <Orders />
            </PrivateRoute>

            <PrivateRoute path="/ordertemplates/:symbol?" >
                <OrderTemplates />
            </PrivateRoute>

            <PrivateRoute path="/settings" >
                <Settings />
            </PrivateRoute>

        </BrowserRouter>
    )
}

export default Routes
