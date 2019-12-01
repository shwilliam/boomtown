import React from 'react'
import PropTypes from 'prop-types'
import {TabContextProvider} from './context'
import useStyles from './TabContainer.styles'

const TabContainer = ({children, ...props}) => {
  const {root} = useStyles()

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
