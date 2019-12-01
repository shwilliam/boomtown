import React, {useContext} from 'react'
import ItemCard, {ItemGrid} from '../../components/ItemCard'
import Layout from '../../components/Layout'
import InfoCard from '../../components/InfoCard'
import {ItemsContext} from '../../context'
import ItemGridCell from '../../components/ItemCard/ItemGridCell'

const Items = () => {
  const {itemsLoading, itemsError, itemsData} = useContext(
    ItemsContext,
  )

  if (itemsLoading)
    return <Layout dark>TODO: loading indicator</Layout>

  if (itemsError)
    return (
      <Layout dark>
        <InfoCard>
          Unable to load items. Please refresh the page to try again.
        </InfoCard>
      </Layout>
    )

  return (
    <Layout dark>
      {itemsData && itemsData.items.length ? (
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
              <ItemGridCell key={id}>
                <ItemCard
                  id={id}
                  title={title}
                  desc={desc}
                  date={created_at}
                  owner={owner.fullname}
                  email={owner.email}
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
              </ItemGridCell>
            ),
          )}
        </ItemGrid>
      ) : (
        <InfoCard>No items found...</InfoCard>
      )}
    </Layout>
  )
}

export default Items
