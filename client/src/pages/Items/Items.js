import React, {useContext} from 'react'
import ItemCard, {ItemGrid} from '../../components/ItemCard'
import Layout from '../../components/Layout'
import {ItemsContext} from '../../context'

const Items = () => {
  const {itemsLoading, itemsError, itemsData} = useContext(
    ItemsContext,
  )

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
                ownerId={owner.id}
                borrowerId={borrower && borrower.id}
                tags={tags}
                disabled={!!borrower}
                imageUrl={
                  process.env.NODE_ENV === 'production'
                    ? `/uploads/${image_url}`
                    : `http://localhost:8080/uploads/${image_url}`
                }
              />
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
