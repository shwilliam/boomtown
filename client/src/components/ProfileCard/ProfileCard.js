import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import styles from './styles'

const ProfileCard = ({
  fullname,
  bio,
  itemsShared,
  itemsBorrowed,
  classes,
  ...props
}) => {
  return (
    <Card className={classes.card} {...props}>
      <CardHeader
        avatar={
          <Avatar aria-label={fullname} className={classes.avatar}>
            {fullname[0]}
          </Avatar>
        }
        title={
          <Typography
            variant="h2"
            color="textSecondary"
            className={classes.title}
          >
            {fullname}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          {itemsShared} Items shared {itemsBorrowed} Items borrowed
        </Typography>
        {bio && (
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
          >
            "{bio}"
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(ProfileCard)
