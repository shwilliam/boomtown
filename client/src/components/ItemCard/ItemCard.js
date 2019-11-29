import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {format as timeago} from 'timeago.js'
import {
  Avatar,
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
import ItemTag from './ItemTag'
import useStyles from './ItemCard.styles'

const ItemCard = ({
  id,
  title,
  date,
  desc,
  owner,
  ownerId,
  borrowerId,
  tags,
  imageUrl,
  disabled = false,
  onChange,
  ...props
}) => {
  const history = useHistory()
  const {activeUser} = useContext(AuthContext)
  const {borrowItem, returnItem, borrowStatus} = useBorrow()
  const styles = useStyles()

  const isOwnItem = () =>
    activeUser && ownerId && ownerId === activeUser.user.id

  return (
    <Card className={styles.root} {...props}>
      <CardHeader
        avatar={
          <Avatar aria-label={owner} className={styles.avatar}>
            {owner[0]}
          </Avatar>
        }
        title={owner}
        subheader={timeago(date)}
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

export default ItemCard
