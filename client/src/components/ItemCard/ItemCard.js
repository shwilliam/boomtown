import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import styles from './styles'

const ItemCard = ({
  title,
  date,
  desc,
  owner,
  classes,
  children,
  ...props
}) => {
  return (
    <Card className={classes.card} {...props}>
      <CardHeader
        avatar={
          <Avatar aria-label={owner} className={classes.avatar}>
            {owner[0]}
          </Avatar>
        }
        title={owner}
        subheader={date}
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
        <Button aria-label="Borrow" variant="outlined">
          Borrow
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(ItemCard)
