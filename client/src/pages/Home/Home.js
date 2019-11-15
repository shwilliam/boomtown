import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AccountForm from '../../components/AccountForm'
import styles from './styles'

const GridItem = ({children, ...props}) => (
  <Grid item xs={12} sm={12} md={6} {...props}>
    {children}
  </Grid>
)

const GridContainer = ({children, ...props}) => (
  <Grid
    container
    direction="row"
    alignItems="center"
    justify="center"
    {...props}
  >
    {children}
  </Grid>
)

const Home = ({classes}) => {
  return (
    <GridContainer className={classes.root}>
      <GridItem>
        <Typography
          variant="button"
          gutterBottom
          className={classes.subheading}
        >
          Boomtown
        </Typography>
        <Typography variant="h1" className={classes.headline}>
          Share. Borrow. Prosper.
        </Typography>
      </GridItem>
      <GridItem>
        <Typography gutterBottom variant="h3">
          Welcome home.
        </Typography>
        <AccountForm />
      </GridItem>
    </GridContainer>
  )
}

export default withStyles(styles)(Home)
