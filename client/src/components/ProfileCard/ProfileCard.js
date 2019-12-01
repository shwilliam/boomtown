import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core'
import {AuthContext} from '../../context'
import Avatar from '../Avatar'
import useStyles from './ProfileCard.styles'
import BioInput from './BioInput'

const ProfileCard = ({
  userId,
  fullname,
  email,
  bio = '',
  items = 0,
  borrowed = 0,
  ...props
}) => {
  const {root, title} = useStyles()
  const {activeUser} = useContext(AuthContext)

  return (
    <Card className={root} {...props}>
      <CardHeader
        avatar={<Avatar email={email} />}
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
          {items} Items shared {borrowed} Items borrowed
        </Typography>
        {activeUser.user.id === userId ? (
          <BioInput bio={bio} />
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
          >
            {bio || 'No bio provided'}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

ProfileCard.propTypes = {
  userId: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  bio: PropTypes.string,
  items: PropTypes.number,
  borrowed: PropTypes.number,
}

export default ProfileCard
