import React, {useContext} from 'react'
import {useQuery} from 'react-apollo'
import {useParams} from 'react-router-dom'
import {Typography} from '@material-ui/core'
import ItemCard, {
  ItemGrid,
  ItemGridCell,
} from '../../components/ItemCard'
import Layout from '../../components/Layout'
import ProfileCard from '../../components/ProfileCard'
import Loading from '../../components/Loading'
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
  } = useQuery(USER_QUERY, {
    variables: {id},
  })

  if (userDataError) return <p>oops...</p>
  if (!userData || userDataLoading)
    return (
      <Layout dark>
        <Loading />
      </Layout>
    )

  const {fullname, email, bio, items, borrowed} = userData.user
  return (
    <Layout dark>
      <ProfileCard
        userId={id}
        fullname={fullname}
        email={email}
        bio={bio}
        items={items && items.length}
        borrowed={borrowed && borrowed.length}
      />
      <TabContainer>
        <TabBar label="User items">
          <TabBarItem index={0}>Shared</TabBarItem>
          <TabBarItem index={1}>Borrowed</TabBarItem>
        </TabBar>
        <TabPanel index={0}>
          {items && items.length ? (
            <ItemGrid>
              {items.map(
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
                  <ItemGridCell key={id}>
                    <ItemCard
                      id={id}
                      title={title}
                      desc={desc}
                      date={created_at}
                      owner={fullname}
                      ownerId={activeUser.user.id}
                      email={email}
                      borrowerId={borrower && borrower.id}
                      disabled={
                        !!borrower || owner.id === activeUser.user.id
                      }
                      tags={tags}
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
            <Typography variant="body1" align="center">
              No items shared...
            </Typography>
          )}
        </TabPanel>
        <TabPanel index={1}>
          {borrowed && borrowed.length ? (
            <ItemGrid>
              {borrowed
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
                    <ItemGridCell key={id}>
                      <ItemCard
                        key={id}
                        id={id}
                        title={title}
                        desc={desc}
                        date={created_at}
                        owner={owner.fullname}
                        email={owner.email}
                        ownerId={owner.id}
                        borrowerId={borrower.id}
                        disabled={!!borrower}
                        tags={tags}
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
            <Typography variant="body1" align="center">
              No items borrowed...
            </Typography>
          )}
        </TabPanel>
      </TabContainer>
    </Layout>
  )
}

export default User
