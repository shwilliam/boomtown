import React, {useContext} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {AuthContext} from '../context'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const {activeUser, loading} = useContext(AuthContext)

  // TODO: fix loading state
  if (loading) return null
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
