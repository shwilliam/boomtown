import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

// TODO: move to new file
const useTitleStyles = makeStyles(() => ({
  root: {
    fontWeight: 400,
    color: 'white',
  },
}))

const Title = ({children, ...props}) => {
  const {root} = useTitleStyles()

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
