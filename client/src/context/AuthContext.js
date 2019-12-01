import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import {useMutation, useQuery} from 'react-apollo'
import {LOGOUT_MUTATION, VIEWER_QUERY} from '../graphql'

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
  const [activeUser, setActiveUser] = useState()
  const [activeUserLoading, setActiveUserLoading] = useState(true)
  const [logoutMutation] = useMutation(LOGOUT_MUTATION)
  const {data: viewerData, error: viewerError} = useQuery(
    VIEWER_QUERY,
  )

  useEffect(() => {
    if (viewerError) setActiveUserLoading(false)
    else if (viewerData) {
      setActiveUser({user: viewerData.viewer})
      setActiveUserLoading(false)
    }
  }, [viewerData, viewerError, setActiveUser])

  const logout = useCallback(() => {
    logoutMutation()
    setActiveUser()
  }, [logoutMutation])

  // authenticating
  if (activeUserLoading) return null
  return (
    <AuthContext.Provider
      value={{
        activeUser,
        setActiveUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default AuthContext
export {AuthContextProvider}
