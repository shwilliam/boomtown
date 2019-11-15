import React from 'react'
import Layout from '../../components/Layout'
import ShareItemForm from '../../components/ShareItemForm'
import {ItemCard, ItemTag} from '../../components/ItemGrid'
import Grid from '@material-ui/core/Grid'

const Share = () => {
  // const [] = useContext()
  const FORM_VALUES = {
    title: 'Something',
    desc: 'Some item',
    tags: [{id: 1, title: 'Fun'}],
  }
  const OWNER = {fullname: 'Greg Bananas'}

  return (
    <Layout>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <ItemCard
            key={FORM_VALUES.id}
            title={FORM_VALUES.title}
            desc={FORM_VALUES.desc}
            date="Just now"
            owner={OWNER.fullname}
          >
            {FORM_VALUES.tags.length
              ? FORM_VALUES.tags.map(({id, title}) => (
                  <ItemTag id={id}>{title}</ItemTag>
                ))
              : null}
          </ItemCard>
        </Grid>
        <Grid item>
          <ShareItemForm />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Share
