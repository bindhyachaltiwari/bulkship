import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('userRole').toLowerCase() === 'Admin'.toLowerCase() ||
        localStorage.getItem('userRole').toLowerCase() === 'Manager'.toLowerCase() ||
        localStorage.getItem('userRole').toLowerCase() === 'Client'.toLowerCase()
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/viewAllUsers',
            state: { from: props.location }
          }} />
    )} />
  )

  export default PrivateRoute;