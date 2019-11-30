import React from 'react'
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

export default Avatar
