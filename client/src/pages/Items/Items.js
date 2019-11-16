import React from 'react'
import {useQuery} from 'react-apollo'
import ItemGrid, {ItemCard, ItemTag} from '../../components/ItemGrid'
import {ALL_ITEMS_QUERY} from '../../graphql'
import Layout from '../../components/Layout'

const Items = () => {
  const {loading, error, data} = useQuery(ALL_ITEMS_QUERY)

  return (
    <Layout dark>
      {loading && <p>loading...</p>}
      {error ? (
        <p>
          Unable to load items. Please refresh the page to try again.
        </p>
      ) : data && data.items ? (
        <ItemGrid>
          {data.items.map(
            ({
              id,
              title,
              desc,
              created_at,
              owner,
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
              >
                {tags.length
                  ? tags.map(({id, title}) => (
                      <ItemTag key={id} id={id}>
                        {title}
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
