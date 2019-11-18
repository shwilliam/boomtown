import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import {useMutation} from 'react-apollo'
import {LOGOUT_MUTATION} from '../graphql'

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
  const [activeUser, setActiveUser] = useState()
  const [logoutMutation] = useMutation(LOGOUT_MUTATION)

  useEffect(() => {
    // TODO: persist using local storage
  }, [activeUser])

  const logout = useCallback(() => {
    logoutMutation()
    setActiveUser(null)
  }, [logoutMutation])

  return (
    <AuthContext.Provider value={{activeUser, setActiveUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export {AuthContextProvider}
