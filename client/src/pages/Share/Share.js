import React from 'react'
import {ShareItemContextProvider} from '../../context'
import {Typography} from '@material-ui/core'
import Layout from '../../components/Layout'
import ShareItemForm from '../../components/ShareItemForm'
import ShareItemPreview from '../../components/ShareItemPreview'
import {Grid, GridItem} from './components'

const Share = () => (
  <Layout>
    <ShareItemContextProvider>
      <Grid>
        <GridItem>
          <ShareItemPreview />
        </GridItem>
        <GridItem>
          <Typography variant="h3" component="p">
            Share. Borrow. Prosper.
          </Typography>
          <ShareItemForm />
        </GridItem>
      </Grid>
    </ShareItemContextProvider>
  </Layout>
)

export default Share
