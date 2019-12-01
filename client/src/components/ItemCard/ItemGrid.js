import React from 'react'
import PropTypes from 'prop-types'
import {Grid} from '@material-ui/core'
import useStyles from './ItemGrid.styles'

const ItemGrid = ({children, ...props}) => {
  const {root} = useStyles()

  return (
    <Grid container spacing={3} className={root} {...props}>
      {children}
    </Grid>
  )
}

ItemGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default ItemGrid
