import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-apollo'
import Layout from '../../components/Layout'
import ItemCard, {ItemGrid, ItemTag} from '../../components/ItemCard'
import ProfileCard from '../../components/ProfileCard'
import {capitalize} from '../../utils'
import {USER_QUERY} from '../../graphql'
import {AuthContext} from '../../context'

const User = () => {
  const {activeUser} = useContext(AuthContext)
  let {id} = useParams()
  if (!id) id = activeUser.user.id

  const {
    data: userData,
    loading: userDataLoading,
    error: userDataError,
  } = useQuery(USER_QUERY, {
    variables: {id},
  })

  if (userDataError) return <p>oops...</p>
  if (!userData || userDataLoading) return <p>loading...</p>

  const {fullname, bio, items, borrowed} = userData.user
  return (
    <Layout dark>
      <ProfileCard
        fullname={fullname}
        bio={bio}
        items={items}
        borrowed={borrowed}
      />
      {items ? (
        <ItemGrid>
          {items.map(
            ({
              id,
              title,
              desc,
              created_at,
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
                owner={fullname}
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

export default User
