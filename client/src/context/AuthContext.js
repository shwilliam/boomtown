import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import {useMutation} from 'react-apollo'
import {LOGOUT_MUTATION} from '../graphql'
import {useLocalStorage} from '../hooks'

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
  const [activeUser, setActiveUser] = useState()
  const [logoutMutation] = useMutation(LOGOUT_MUTATION)
  const [localUser, setLocalUser] = useLocalStorage('user')

  useEffect(() => {
    if (activeUser) setLocalUser(activeUser)
  }, [activeUser, setLocalUser])

  const logout = useCallback(() => {
    logoutMutation()
    setActiveUser(null)
    setLocalUser()
  }, [logoutMutation, setLocalUser])

  return (
    <AuthContext.Provider
      value={{
        activeUser: localUser || activeUser,
        setActiveUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export {AuthContextProvider}
