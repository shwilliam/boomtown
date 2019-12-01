import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from '@material-ui/core'

const ModalTitle = ({children, ...props}) => (
  <Typography variant="h6" component="p" {...props}>
    {children}
  </Typography>
)

ModalTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default ModalTitle
