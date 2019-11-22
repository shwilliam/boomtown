import React from 'react'
import {Typography} from '@material-ui/core'
import AccountForm from '../../components/AccountForm'
import {Grid, GridItem, Title, HeroText} from './components'

const Home = () => (
  <Grid>
    <GridItem>
      <Title>Boomtown</Title>
      <HeroText>Share. Borrow. Prosper.</HeroText>
    </GridItem>

    <GridItem>
      <Typography gutterBottom variant="h2">
        Welcome home.
      </Typography>
      <AccountForm />
    </GridItem>
  </Grid>
)

export default Home
