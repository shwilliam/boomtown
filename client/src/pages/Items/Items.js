import React, {useContext} from 'react'
import ItemGrid, {ItemCard, ItemTag} from '../../components/ItemGrid'
import Layout from '../../components/Layout'
import {GQLContext} from '../../context'
import {capitalize} from '../../utils'

const Items = () => {
  const {itemsLoading, itemsError, itemsData} = useContext(GQLContext)

  return (
    <Layout dark>
      {itemsLoading && <p>loading...</p>}
      {itemsError ? (
        <p>
          Unable to load items. Please refresh the page to try again.
        </p>
      ) : itemsData && itemsData.items ? (
        <ItemGrid>
          {itemsData.items.map(
            ({
              id,
              title,
              desc,
              created_at,
              owner,
              image_url,
              borrower,
              tags,
            }) => (
              <ItemCard
                key={id}
                id={id}
                title={title}
                desc={desc}
                date={created_at}
                owner={owner.fullname}
                disabled={!!borrower}
                imageUrl={
                  process.env.NODE_ENV === 'production'
                    ? `/uploads/${image_url}`
                    : `http://localhost:8080/uploads/${image_url}`
                }
              >
                {tags.length
                  ? tags.map(({id, title}) => (
                      <ItemTag key={id} id={id}>
                        {capitalize(title)}
                      </ItemTag>
                    ))
                  : null}
              </ItemCard>
            ),
          )}
        </ItemGrid>
      ) : (
        <p>No items found...</p>
      )}
    </Layout>
  )
}

export default Items
