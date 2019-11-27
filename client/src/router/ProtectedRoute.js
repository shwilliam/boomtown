import React, {useContext} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {AuthContext} from '../context'

const ProtectedRoute = ({component: Component, ...props}) => {
  const {activeUser} = useContext(AuthContext)

  return (
    <Route
      {...props}
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
