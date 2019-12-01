import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from '@material-ui/core'
import useStyles from './HeroText.styles'

const HeroText = ({children, ...props}) => {
  const {root} = useStyles()

  return (
    <Typography variant="h1" className={root} {...props}>
      {children}
    </Typography>
  )
}

HeroText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default HeroText
