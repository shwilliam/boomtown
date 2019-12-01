import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {TabContextProvider} from './context'

// TODO: move to new file
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

TabContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default TabContainer
