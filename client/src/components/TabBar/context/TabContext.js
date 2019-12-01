import React, {createContext} from 'react'
import PropTypes from 'prop-types'

const TabContext = createContext()

const TabContextProvider = ({children, ...props}) => {
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <TabContext.Provider value={{activeTab, setActiveTab}} {...props}>
      {children}
    </TabContext.Provider>
  )
}

TabContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default TabContext
export {TabContextProvider}
