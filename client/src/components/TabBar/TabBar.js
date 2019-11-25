import React, {useCallback, useContext} from 'react'
import {AppBar, Tabs} from '@material-ui/core'
import TabContext from './context'

const TabBar = ({label, children, ...props}) => {
  const {activeTab, setActiveTab} = useContext(TabContext)

  const onChange = useCallback(
    (_, val) => {
      setActiveTab(val)
    },
    [setActiveTab],
  )

  return (
    <AppBar position="static">
      <Tabs
        value={activeTab}
        onChange={onChange}
        aria-label={label}
        {...props}
      >
        {children}
      </Tabs>
    </AppBar>
  )
}

export default TabBar
