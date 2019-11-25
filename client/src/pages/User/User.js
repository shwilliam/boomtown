import React, {useContext} from 'react'
import {useQuery} from 'react-apollo'
import {useParams} from 'react-router-dom'
import ItemCard, {ItemGrid, ItemTag} from '../../components/ItemCard'
import Layout from '../../components/Layout'
import ProfileCard from '../../components/ProfileCard'
import TabBar, {
  TabBarItem,
  TabContainer,
  TabPanel,
} from '../../components/TabBar'
import {AuthContext} from '../../context'
import {USER_QUERY} from '../../graphql'
import {capitalize} from '../../utils'

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
      <TabContainer>
        <TabBar label="User items">
          <TabBarItem index={0}>Shared items</TabBarItem>
          <TabBarItem index={1}>Borrowed items</TabBarItem>
        </TabBar>
        <TabPanel index={0}>
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
        </TabPanel>
        <TabPanel index={1}>TODO</TabPanel>
      </TabContainer>
    </Layout>
  )
}

export default User
