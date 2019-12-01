import React, {useState, useCallback, useContext} from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
} from '@material-ui/core'
import {useMutation} from 'react-apollo'
import {UPDATE_BIO_MUTATION} from '../../graphql'
import {AuthContext} from '../../context'
import Avatar from '../Avatar'
import useStyles from './ProfileCard.styles'

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
  const [bioTouched, setBioTouched] = useState(false)
  const [bioInput, setBioInput] = useState(bio)
  const [updateBio] = useMutation(UPDATE_BIO_MUTATION, {
    refetchQueries: ['user'],
  })

  const onBioSubmit = useCallback(
    e => {
      e.preventDefault()
      updateBio({variables: {bio: bioInput}})
    },
    [updateBio, bioInput],
  )

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
          <form noValidate autoComplete="off" onSubmit={onBioSubmit}>
            <TextField
              value={bioInput || ''}
              onChange={e => setBioInput(e.target.value)}
              onFocus={() => setBioTouched(true)}
              label={bioInput ? 'Bio' : 'No bio provided'}
              multiline
              rows="2"
            />
            <Button
              type="submit"
              disabled={!bioTouched || bio === bioInput}
            >
              Save
            </Button>
          </form>
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
