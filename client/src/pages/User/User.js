import React, {useContext} from 'react'
import {useQuery} from 'react-apollo'
import {useParams} from 'react-router-dom'
import ItemCard, {ItemGrid} from '../../components/ItemCard'
import Layout from '../../components/Layout'
import ProfileCard from '../../components/ProfileCard'
import TabBar, {
  TabBarItem,
  TabContainer,
  TabPanel,
} from '../../components/TabBar'
import {AuthContext} from '../../context'
import {USER_QUERY} from '../../graphql'

const User = () => {
  const {activeUser} = useContext(AuthContext)
  let {id} = useParams()
  if (!id) id = activeUser.user.id

  const {
    data: userData,
    loading: userDataLoading,
    error: userDataError,
    refetch: refetchUserData,
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
          <TabBarItem index={0}>Shared</TabBarItem>
          <TabBarItem index={1}>Borrowed</TabBarItem>
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
                    tags={tags}
                    imageUrl={
                      process.env.NODE_ENV === 'production'
                        ? `/uploads/${image_url}`
                        : `http://localhost:8080/uploads/${image_url}`
                    }
                    onChange={refetchUserData}
                  />
                ),
              )}
            </ItemGrid>
          ) : (
            <p>No items shared...</p>
          )}
        </TabPanel>
        <TabPanel index={1}>
          {borrowed ? (
            <ItemGrid>
              {borrowed
                // HACK: refetch returns stale items wo borrower
                .filter(({borrower}) => !!borrower)
                .map(
                  ({
                    id,
                    title,
                    desc,
                    created_at,
                    image_url,
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
                      ownerId={owner.id}
                      borrowerId={borrower.id}
                      disabled={!!borrower}
                      tags={tags}
                      imageUrl={
                        process.env.NODE_ENV === 'production'
                          ? `/uploads/${image_url}`
                          : `http://localhost:8080/uploads/${image_url}`
                      }
                      onChange={refetchUserData}
                    />
                  ),
                )}
            </ItemGrid>
          ) : (
            <p>No items borrowed...</p>
          )}
        </TabPanel>
      </TabContainer>
    </Layout>
  )
}

export default User
