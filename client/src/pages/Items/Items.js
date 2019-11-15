import React from 'react'
import {useQuery} from 'react-apollo'
import ItemGrid, {ItemCard, ItemTag} from '../../components/ItemGrid'
import {ALL_ITEMS_QUERY} from '../../graphql'
import Layout from '../../components/Layout'

const Items = () => {
  const {loading, error, data} = useQuery(ALL_ITEMS_QUERY)

  return (
    <Layout>
      {loading && <p>loading...</p>}
      {error ? (
        <p>
          Unable to load items. Please refresh the page to try again.
        </p>
      ) : data && data.items ? (
        <ItemGrid>
          {data.items.map(
            ({id, title, desc, created_at, owner, tags}) => (
              <ItemCard
                key={id}
                title={title}
                desc={desc}
                date={created_at}
                owner={owner.fullname}
              >
                {tags.length ? (
                  <ul>
                    {tags.map(({id, title}) => (
                      <ItemTag id={id}>{title}</ItemTag>
                    ))}
                  </ul>
                ) : null}
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
