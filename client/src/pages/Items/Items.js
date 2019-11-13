import React from 'react'
import {useQuery} from 'react-apollo'
import {ALL_ITEMS_QUERY} from '../../graphql'

const Items = () => {
  const {loading, error, data} = useQuery(ALL_ITEMS_QUERY)

  if (loading) return <p>loading...</p>
  if (error) return <p>oops</p>

  return (
    <div>
      {data && data.items ? (
        <ul>
          {data.items.map(({id, title, desc, tags}) => (
            <li key={id}>
              <p>{title}</p>
              <p>{desc}</p>
              {tags.length ? (
                <ul>
                  {tags.map(({id, title}) => (
                    <li key={id}>{title}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found...</p>
      )}
    </div>
  )
}
export default Items
