import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'
import {format as timeago} from 'timeago.js'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@material-ui/core'
import {AuthContext} from '../../context'
import {capitalize} from '../../utils'
import {useBorrow} from '../../hooks'
import Avatar from '../Avatar'
import ItemTags from './ItemTags'
import useStyles from './ItemCard.styles'

const ItemCard = ({
  id,
  title,
  date,
  desc,
  owner,
  email,
  ownerId,
  borrowerId,
  tags,
  imageUrl,
  disabled = false,
  ...props
}) => {
  const history = useHistory()
  const {activeUser} = useContext(AuthContext)
  const {borrowItem, returnItem, borrowStatus} = useBorrow()
  const styles = useStyles()

  const isOwnItem = !ownerId || String(ownerId) === activeUser.user.id
  const isBorrower = activeUser.user.id === borrowerId

  return (
    <Card {...props}>
      <CardMedia
        className={styles.media}
        image={
          imageUrl ||
          'https://via.placeholder.com/420x320/f9a825/333333?text=%20'
        }
        title={`Image of ${title}`}
      />
      <CardHeader
        avatar={<Avatar email={email} />}
        title={owner}
        subheader={date ? timeago(date) : 'Just now'}
        onClick={() =>
          isOwnItem
            ? history.push('/profile')
            : history.push(`/user/${ownerId}`)
        }
      />
      <CardContent>
        <Typography
          component="h3"
          variant="h5"
          className={styles.titleClasses}
        >
          {title}
        </Typography>
        {tags && tags.length ? (
          <ItemTags>
            {tags.map(({title}) => capitalize(title)).join(', ')}
          </ItemTags>
        ) : null}
        <Typography variant="body1" color="textPrimary" component="p">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          aria-label={isBorrower ? 'Return' : 'Borrow'}
          variant="outlined"
          disabled={
            (!isBorrower && disabled) ||
            borrowStatus === 0 ||
            borrowStatus === -1
          }
          onClick={() =>
            isBorrower
              ? returnItem({variables: {item: id}})
              : borrowItem({variables: {item: id}})
          }
        >
          {isBorrower ? 'Return' : 'Borrow'}
        </Button>
      </CardActions>
    </Card>
  )
}

ItemCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  desc: PropTypes.string,
  owner: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  ownerId: PropTypes.string,
  borrowerId: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ),
  imageUrl: PropTypes.string,
  disabled: PropTypes.bool,
}

export default ItemCard
