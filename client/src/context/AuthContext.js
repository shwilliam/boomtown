import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react'

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
  const [activeUser, setActiveUser] = useState()

  useEffect(() => {
    // TODO: persist using local storage
  }, [activeUser])

  const logout = useCallback(() => {
    console.log(process.env.REACT_APP_JWT_COOKIE_NAME)
    document.cookie = `${process.env.REACT_APP_JWT_COOKIE_NAME}=; Max-Age=0`
    console.log(document.cookie)
    setActiveUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{activeUser, setActiveUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export {AuthContextProvider}
