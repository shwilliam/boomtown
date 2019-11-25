import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {TabContextProvider} from './context'

const useTabsStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

const TabContainer = ({children, ...props}) => {
  const {root} = useTabsStyles()

  return (
    <TabContextProvider>
      <div className={root} {...props}>
        {children}
      </div>
    </TabContextProvider>
  )
}

export default TabContainer
