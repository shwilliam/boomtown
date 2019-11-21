import React from 'react'
import {Grid as MaterialGrid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import styles from './styles'

const Grid = ({classes, children, ...props}) => (
  <MaterialGrid
    container
    direction="row"
    alignItems="center"
    justify="center"
    className={classes.grid}
    {...props}
  >
    {children}
  </MaterialGrid>
)

export default withStyles(styles)(Grid)
