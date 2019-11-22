import React, {Children} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

const useItemGridStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

const ItemGrid = ({children, ...props}) => {
  const {root} = useItemGridStyles()

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
