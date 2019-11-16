import React from 'react'
import {useQuery} from 'react-apollo'
import {VIEWER_QUERY} from '../../graphql'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import styles from './styles'

const ProfileCard = ({classes, ...props}) => {
  const {loading, error, data: userData} = useQuery(VIEWER_QUERY)

  if (error) return <p>oops...</p>
  if (loading) return <p>loading...</p>

  const {fullname, bio, items, borrowed} = userData.viewer
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

export default withStyles(styles)(ProfileCard)
