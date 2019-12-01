import React from 'react'
import PropTypes from 'prop-types'
import {Card, Typography} from '@material-ui/core'
import useStyles from './InfoCard.styles'

const InfoCard = ({children, ...props}) => {
  const {root, content} = useStyles()

  return (
    <div className={root}>
      <Card className={content} {...props}>
        <Typography variant="body1">{children}</Typography>
      </Card>
    </div>
  )
}

InfoCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default InfoCard
