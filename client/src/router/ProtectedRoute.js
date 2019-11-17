import React, {useContext} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {AuthContext} from '../context'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const {activeUser} = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props =>
        activeUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/welcome" />
        )
      }
    />
  )
}

export default ProtectedRoute
