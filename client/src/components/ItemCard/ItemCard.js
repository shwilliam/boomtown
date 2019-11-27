import React, {useContext} from 'react'
import {useMutation} from '@apollo/react-hooks'
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
import {red} from '@material-ui/core/colors'
import {makeStyles} from '@material-ui/core/styles'
import {AuthContext} from '../../context'
import {
  BORROW_ITEM_MUTATION,
  RETURN_ITEM_MUTATION,
} from '../../graphql'
import {capitalize} from '../../utils'
import ItemTag from './ItemTag'

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
  borrowerId,
  tags,
  imageUrl,
  disabled = false,
  onChange,
  ...props
}) => {
  const history = useHistory()
  const {activeUser} = useContext(AuthContext)
  const [borrowItem, {data: borrowItemStatus}] = useMutation(
    BORROW_ITEM_MUTATION,
    {refetchQueries: ['items', 'user']},
  )
  const [returnItem] = useMutation(RETURN_ITEM_MUTATION, {
    refetchQueries: ['items', 'user'],
  })
  const {
    root,
    media,
    avatar,
    title: titleClasses,
  } = useItemCardStyles()

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
              disabled ||
              borrowItemStatus === 0 ||
              borrowItemStatus === -1
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
