import React from 'react'
import PropTypes from 'prop-types'
import {Grid as MuiGrid} from '@material-ui/core'
import useStyles from './Grid.styles'

const Grid = ({children, ...props}) => {
  const {root} = useStyles()

  return (
    <MuiGrid
      container
      spacing={5}
      alignItems="flex-start"
      justify="center"
      className={root}
      {...props}
    >
      {children}
    </MuiGrid>
  )
}

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Grid
