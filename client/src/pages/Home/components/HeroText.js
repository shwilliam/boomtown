import React from 'react'
import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import styles from './styles'

const HeroText = ({classes, children, ...props}) => (
  <Typography variant="h1" className={classes.heroText} {...props}>
    {children}
  </Typography>
)

export default withStyles(styles)(HeroText)
