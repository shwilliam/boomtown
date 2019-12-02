import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from '@material-ui/core'

const ItemTags = ({children, ...props}) => (
  <Typography
    variant="body2"
    color="textSecondary"
    component="p"
    {...props}
  >
    {children}
  </Typography>
)

ItemTags.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default ItemTags
