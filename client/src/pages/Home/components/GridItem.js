import React from 'react'
import Grid from '@material-ui/core/Grid'

const GridItem = ({children, ...props}) => (
  <Grid item xs={12} sm={12} md={6} {...props}>
    {children}
  </Grid>
)

export default GridItem
