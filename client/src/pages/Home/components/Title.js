import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'

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

export default Title
