import React, {useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {red} from '@material-ui/core/colors'
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from '@material-ui/core'
import {GQLContext} from '../../context'

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

const ProfileCard = props => {
  const {userDataLoading, userDataError, userData} = useContext(
    GQLContext,
  )
  const {root, avatar, title} = useProfileCardStyles()

  if (userDataError) return <p>oops...</p>
  if (userDataLoading) return <p>loading...</p>

  const {fullname, bio, items, borrowed} = userData.viewer
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
