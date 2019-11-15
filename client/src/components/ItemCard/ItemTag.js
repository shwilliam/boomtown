import React from 'react'
import Typography from '@material-ui/core/Typography'

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

export default ItemTag
