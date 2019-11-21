import React from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import styles from './styles'

const Title = ({classes, children, ...props}) => (
  <Typography
    component="h1"
    variant="button"
    gutterBottom
    className={classes.title}
    {...props}
  >
    {children}
  </Typography>
)

export default withStyles(styles)(Title)
