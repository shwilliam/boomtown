import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from '@material-ui/core'
import useStyles from './Title.styles'

const Title = ({children, ...props}) => {
  const {root} = useStyles()

  return (
    <Typography
      component="h1"
      variant="button"
      gutterBottom
      className={root}
      {...props}
    >
      {children}
    </Typography>
  )
}

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Title
