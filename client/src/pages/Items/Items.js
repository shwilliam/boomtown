import React from 'react'
import {useQuery} from 'react-apollo'
import ItemCard, {ItemTag} from '../../components/ItemCard'
import {ALL_ITEMS_QUERY} from '../../graphql'
import MenuBar from '../../components/MenuBar'

const Items = () => {
  const {loading, error, data} = useQuery(ALL_ITEMS_QUERY)

  return (
    <div>
      <MenuBar />
      {loading && <p>loading...</p>}
      {error ? (
        <p>
          Unable to load items. Please refresh the page to try again.
        </p>
      ) : data && data.items ? (
        <ul>
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
        </ul>
      ) : (
        <p>No items found...</p>
      )}
    </div>
  )
}

export default Items
