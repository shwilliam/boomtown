import React from 'react'
import PropTypes from 'prop-types'
import {Grid as MuiGrid} from '@material-ui/core'
import useStyles from './GridItem.styles'

const GridItem = ({children, ...props}) => {
  const {root} = useStyles()

  return (
    <MuiGrid item xs={12} md={6} className={root} {...props}>
      {children}
    </MuiGrid>
  )
}

GridItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default GridItem
