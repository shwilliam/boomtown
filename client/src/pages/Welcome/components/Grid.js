import React from 'react'
import PropTypes from 'prop-types'
import {Grid as MaterialGrid} from '@material-ui/core'
import useStyles from './Grid.styles'

const Grid = ({children, ...props}) => {
  const {root} = useStyles()

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
