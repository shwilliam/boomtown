import React from 'react'
import {CircularProgress, Typography} from '@material-ui/core'
import useStyles from './Loading.styles'

const Loading = props => {
  const {root, loader} = useStyles()

  return (
    <div className={root}>
      <CircularProgress className={loader} {...props} />
      <Typography variant="body1">
        "For it is in giving that we receive"
      </Typography>
    </div>
  )
}

export default Loading
