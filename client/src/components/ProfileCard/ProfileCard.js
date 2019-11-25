import React from 'react'
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core'
import {red} from '@material-ui/core/colors'
import {makeStyles} from '@material-ui/core/styles'

const useProfileCardStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '0 auto',
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    fontSize: '2rem',
    fontWeight: 500,
  },
})

const ProfileCard = ({fullname, bio, items, borrowed, ...props}) => {
  const {root, avatar, title} = useProfileCardStyles()

  return (
    <Card className={root} {...props}>
      <CardHeader
        avatar={
          <Avatar aria-label={fullname} className={avatar}>
            {fullname[0]}
          </Avatar>
        }
        title={
          <Typography
            variant="h2"
            color="textSecondary"
            className={title}
          >
            {fullname}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          {items.length} Items shared {borrowed.length} Items borrowed
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

export default ProfileCard
