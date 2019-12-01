import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

// TODO: move to new file
const useHeroTextStyles = makeStyles(theme => ({
  root: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h3.fontSize,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.h1.fontSize,
    },
  },
}))

const HeroText = ({children, ...props}) => {
  const {root} = useHeroTextStyles()

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
