import React, {useContext} from 'react'
import {Typography, Box} from '@material-ui/core/'
import TabContext from './context'

const TabPanel = ({children, index, ...props}) => {
  const {activeTab} = useContext(TabContext)

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={activeTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...props}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

export default TabPanel
