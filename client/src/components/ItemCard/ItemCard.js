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
import ItemTag from './ItemTag'
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

  return (
    <Card {...props}>
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
      <CardMedia
        className={styles.media}
        image={
          imageUrl ||
          'https://via.placeholder.com/420x320/f9a825/333333?text=%20'
        }
        title={imageUrl ? title : ''}
      />
      <CardContent>
        <Typography variant="h3" className={styles.titleClasses}>
          {title}
        </Typography>
        {tags && tags.length
          ? tags.map(({id, title}) => (
              <ItemTag key={id} id={id}>
                {capitalize(title)}
              </ItemTag>
            ))
          : null}
        <Typography variant="body1" color="textPrimary" component="p">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {activeUser.user.id === borrowerId ? (
          <Button
            aria-label="Return"
            variant="outlined"
            onClick={() => returnItem({variables: {item: id}})}
          >
            Return
          </Button>
        ) : (
          <Button
            aria-label="Borrow"
            variant="outlined"
            disabled={
              disabled || borrowStatus === 0 || borrowStatus === -1
            }
            onClick={() => borrowItem({variables: {item: id}})}
          >
            Borrow
          </Button>
        )}
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
