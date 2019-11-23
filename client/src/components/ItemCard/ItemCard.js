import React, {useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useMutation} from '@apollo/react-hooks'
import {format as timeago} from 'timeago.js'
import {makeStyles} from '@material-ui/core/styles'
import {red} from '@material-ui/core/colors'
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  Button,
  Typography,
} from '@material-ui/core'
import {BORROW_ITEM_MUTATION} from '../../graphql'
import {ItemsContext} from '../../context'

const useItemCardStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    fontSize: '1.6rem',
  },
})

const ItemCard = ({
  id,
  title,
  date,
  desc,
  owner,
  ownerId,
  imageUrl,
  children,
  disabled = false,
  ...props
}) => {
  const history = useHistory()
  const {refetchItems} = useContext(ItemsContext)
  const [borrowItem, {data: itemStatus}] = useMutation(
    BORROW_ITEM_MUTATION,
  )
  const {
    root,
    media,
    avatar,
    title: titleClasses,
  } = useItemCardStyles()

  useEffect(() => {
    if (itemStatus) refetchItems()
  }, [itemStatus, refetchItems])

  return (
    <Card className={root} {...props}>
      <CardHeader
        avatar={
          <Avatar aria-label={owner} className={avatar}>
            {owner[0]}
          </Avatar>
        }
        title={owner}
        subheader={timeago(date)}
        onClick={() => ownerId && history.push(`/user/${ownerId}`)}
      />
      <CardMedia
        className={media}
        image={
          imageUrl ||
          'https://via.placeholder.com/420x320/f9a825/333333?text=%20'
        }
        title={imageUrl ? title : ''}
      />
      <CardContent>
        <Typography variant="h3" className={titleClasses}>
          {title}
        </Typography>
        {children}
        <Typography variant="body1" color="textPrimary" component="p">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          aria-label="Borrow"
          variant="outlined"
          disabled={disabled || itemStatus === 0 || itemStatus === -1}
          onClick={() => borrowItem({variables: {item: id}})}
        >
          Borrow
        </Button>
      </CardActions>
    </Card>
  )
}

export default ItemCard
