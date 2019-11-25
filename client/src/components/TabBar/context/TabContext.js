import React, {createContext} from 'react'

const TabContext = createContext()

const TabContextProvider = ({children, ...props}) => {
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <TabContext.Provider value={{activeTab, setActiveTab}} {...props}>
      {children}
    </TabContext.Provider>
  )
}

export default TabContext
export {TabContextProvider}
