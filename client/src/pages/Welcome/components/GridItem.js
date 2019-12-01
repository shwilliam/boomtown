import React from 'react'
import PropTypes from 'prop-types'
import {Grid} from '@material-ui/core'

const GridItem = ({children, ...props}) => (
  <Grid item xs={12} sm={12} md={6} {...props}>
    {children}
  </Grid>
)

GridItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default GridItem
