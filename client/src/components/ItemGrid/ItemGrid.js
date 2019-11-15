import React, {Children} from 'react'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import styles from './styles'

const ItemGrid = ({classes, children, ...props}) => (
  <Grid className={classes.grid} container spacing={3} {...props}>
    {Children.map(children, child => (
      <Grid item xs>
        {child}
      </Grid>
    ))}
  </Grid>
)

export default withStyles(styles)(ItemGrid)
