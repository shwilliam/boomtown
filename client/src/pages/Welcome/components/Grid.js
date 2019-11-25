import React from 'react'
import {Grid as MaterialGrid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useGridStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    background: theme.palette.primary.main,
    padding: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(20),
    },
  },
}))

const Grid = ({children, ...props}) => {
  const {root} = useGridStyles()

  return (
    <MaterialGrid
      container
      direction="row"
      alignItems="center"
      justify="center"
      className={root}
      {...props}
    >
      {children}
    </MaterialGrid>
  )
}

export default Grid
