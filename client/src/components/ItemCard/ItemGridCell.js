import React from 'react'
import PropTypes from 'prop-types'
import {Grid} from '@material-ui/core'

const ItemGridCell = ({children, ...props}) => (
  <Grid item xs={12} sm={6} md={4} {...props}>
    {children}
  </Grid>
)

ItemGridCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default ItemGridCell
