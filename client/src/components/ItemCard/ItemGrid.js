import React, {Children} from 'react'
import {Grid} from '@material-ui/core'
import useStyles from './ItemGrid.styles'

const ItemGrid = ({children, ...props}) => {
  const {root} = useStyles()

  return (
    <Grid className={root} container spacing={3} {...props}>
      {Children.map(children, child => (
        <Grid item xs>
          {child}
        </Grid>
      ))}
    </Grid>
  )
}

export default ItemGrid
