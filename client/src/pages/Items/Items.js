import React, {useContext} from 'react'
import {ItemsContext} from '../../context'
import ItemCard, {
  ItemGrid,
  ItemGridCell,
} from '../../components/ItemCard'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import InfoCard from '../../components/InfoCard'

const Items = () => {
  const {itemsData, itemsLoading, itemsError} = useContext(
    ItemsContext,
  )

  if (itemsLoading)
    return (
      <Layout dark>
        <Loading />
      </Layout>
    )

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
          {itemsData.items.map(item => (
            <ItemGridCell key={item.id}>
              <ItemCard
                id={item.id}
                title={item.title}
                desc={item.desc}
                date={item.created_at}
                owner={item.owner.fullname}
                email={item.owner.email}
                ownerId={item.owner.id}
                borrowerId={item.borrower && item.borrower.id}
                tags={item.tags}
                disabled={!!item.borrower}
                imageUrl={
                  !!item.image_url
                    ? process.env.NODE_ENV === 'production'
                      ? `/uploads/${item.image_url}`
                      : `http://localhost:8080/uploads/${item.image_url}`
                    : null
                }
              />
            </ItemGridCell>
          ))}
        </ItemGrid>
      ) : (
        <InfoCard>No items found...</InfoCard>
      )}
    </Layout>
  )
}

export default Items
