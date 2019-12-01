import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from '@material-ui/core'
import useStyles from './ModalBody.styles'

const ModalBody = ({children, ...props}) => {
  const {root} = useStyles()

  return (
    <Typography variant="body1" className={root} {...props}>
      {children}
    </Typography>
  )
}

ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default ModalBody
