import React from 'react'
import {Typography} from '@material-ui/core'

const ModalTitle = ({children, ...props}) => (
  <Typography variant="h6" component="p" {...props}>
    {children}
  </Typography>
)

export default ModalTitle
