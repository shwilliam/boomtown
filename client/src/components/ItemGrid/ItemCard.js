import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {format as timeago} from 'timeago.js'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {BORROW_ITEM_MUTATION} from '../../graphql'
import styles from './styles'

const ItemCard = ({
  id,
  title,
  date,
  desc,
  owner,
  classes,
  children,
  disabled = false,
  ...props
}) => {
  const [borrowItem, {itemStatus}] = useMutation(BORROW_ITEM_MUTATION)

  return (
    <Card className={classes.card} {...props}>
      <CardHeader
        avatar={
          <Avatar aria-label={owner} className={classes.avatar}>
            {owner[0]}
          </Avatar>
        }
        title={owner}
        subheader={timeago(date)}
      />
      <CardMedia
        className={classes.media}
        image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.akc.org%2Fcontent%2Fhero%2Fpuppy-boundaries_header.jpg&f=1&nofb=1"
        title="pup"
      />
      <CardContent>
        <Typography variant="h3" className={classes.title}>
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

export default withStyles(styles)(ItemCard)
