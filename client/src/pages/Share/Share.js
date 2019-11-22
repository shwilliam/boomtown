import React from 'react'
import {Grid} from '@material-ui/core'
import Layout from '../../components/Layout'
import ShareItemForm from '../../components/ShareItemForm'
import ShareItemPreview from '../../components/ShareItemPreview'
import {ShareItemContextProvider} from '../../context'

const Share = () => (
  <Layout>
    <ShareItemContextProvider>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <ShareItemPreview />
        </Grid>
        <Grid item>
          <ShareItemForm />
        </Grid>
      </Grid>
    </ShareItemContextProvider>
  </Layout>
)

export default Share
