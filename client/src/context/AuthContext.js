import React, {createContext, useState, useEffect} from 'react'

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
  const [activeUser, setActiveUser] = useState()

  useEffect(() => {
    // TODO: persist using local storage
  }, [activeUser])

  return (
    <AuthContext.Provider value={{activeUser, setActiveUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export {AuthContextProvider}
