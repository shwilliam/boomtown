import React, {useCallback, useContext} from 'react'
import PropTypes from 'prop-types'
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

TabBar.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default TabBar
