import React from 'react'
import {Tab} from '@material-ui/core'

const a11yProps = i => ({
  id: `simple-tab-${i}`,
  'aria-controls': `simple-tabpanel-${i}`,
})

const TabBarItem = ({index, children, ...props}) => (
  <Tab label={children} {...a11yProps(index)} {...props} />
)

export default TabBarItem
