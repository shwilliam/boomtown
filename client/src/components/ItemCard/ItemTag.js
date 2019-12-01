import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from '@material-ui/core'

const ItemTag = ({children, ...props}) => (
  <Typography
    variant="body2"
    color="textSecondary"
    component="p"
    {...props}
  >
    {children}
  </Typography>
)

ItemTag.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default ItemTag
