import React from 'react'
import PropTypes from 'prop-types'
import {Grid as MaterialGrid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

// TODO: move to new file
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

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Grid
