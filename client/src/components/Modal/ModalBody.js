import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from '@material-ui/core'

const ModalBody = ({children, ...props}) => (
  <Typography variant="body1" {...props}>
    {children}
  </Typography>
)

ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default ModalBody
