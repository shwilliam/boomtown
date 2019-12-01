import React from 'react'
import {Typography} from '@material-ui/core'

const ModalBody = ({children, ...props}) => (
  <Typography variant="body1" {...props}>
    {children}
  </Typography>
)

export default ModalBody
