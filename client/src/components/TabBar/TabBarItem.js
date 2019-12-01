import React from 'react'
import PropTypes from 'prop-types'
import {Tab} from '@material-ui/core'

const a11yProps = i => ({
  id: `simple-tab-${i}`,
  'aria-controls': `simple-tabpanel-${i}`,
})

const TabBarItem = ({index, children, ...props}) => (
  <Tab label={children} {...a11yProps(index)} {...props} />
)

TabBarItem.propTypes = {
  index: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default TabBarItem
