import React from 'react'
import PropTypes from 'prop-types'
import Gravatar from 'react-gravatar'
import useStyles from './Avatar.styles'

const Avatar = ({email, ...props}) => {
  const {root} = useStyles()

  return (
    <Gravatar
      email={email}
      className={root}
      rating="pg"
      default="monsterid"
      {...props}
    />
  )
}

Avatar.propTypes = {
  email: PropTypes.string.isRequired,
}

export default Avatar
