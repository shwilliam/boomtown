import React from 'react'
import Layout from '../../components/Layout'
import ShareItemForm from '../../components/ShareItemForm'
import Grid from '@material-ui/core/Grid'
import {ShareItemContextProvider} from '../../context'
import ShareItemPreview from '../../components/ShareItemPreview'

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
