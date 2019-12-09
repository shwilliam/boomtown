import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import {Typography} from '@material-ui/core'
import InfoCard from '../../components/InfoCard'
import ItemCard, {
  ItemGrid,
  ItemGridCell,
} from '../../components/ItemCard'
import TabBar, {
  TabBarItem,
  TabContainer,
  TabPanel,
} from '../../components/TabBar'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import ProfileCard from '../../components/ProfileCard'
import {AuthContext} from '../../context'
import {useUserData} from '../../hooks'

const User = () => {
  const {id} = useParams()
  const {activeUser} = useContext(AuthContext)
  const {data, loading, error} = useUserData(id)

  if (error)
    return (
      <Layout dark>
        <InfoCard>Unable to find user.</InfoCard>
      </Layout>
    )

  if (loading)
    return (
      <Layout dark>
        <Loading />
      </Layout>
    )

  const {
    id: userId,
    fullname,
    email,
    bio,
    items,
    amountShared,
    borrowed,
    amountBorrowed,
  } = data
  return (
    <Layout dark>
      <ProfileCard
        userId={userId}
        fullname={fullname}
        email={email}
        bio={bio}
        items={amountShared}
        borrowed={amountBorrowed}
      />
      <TabContainer>
        <TabBar label="User items">
          <TabBarItem index={0}>Shared</TabBarItem>
          <TabBarItem index={1}>Borrowed</TabBarItem>
        </TabBar>
        <TabPanel index={0}>
          {!!amountShared ? (
            <ItemGrid>
              {items.map(item => (
                <ItemGridCell key={item.id}>
                  <ItemCard
                    id={item.id}
                    title={item.title}
                    desc={item.desc}
                    date={item.created_at}
                    owner={fullname}
                    ownerId={item.owner.id}
                    email={email}
                    borrowerId={item.borrower && item.borrower.id}
                    disabled={
                      !!item.borrower ||
                      item.owner.id === activeUser.user.id
                    }
                    tags={item.tags}
                    imageUrl={
                      item.image_url
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
            <Typography variant="body1" align="center">
              No items shared...
            </Typography>
          )}
        </TabPanel>
        <TabPanel index={1}>
          {!!amountBorrowed ? (
            <ItemGrid>
              {borrowed
                .filter(({borrower}) => !!borrower)
                .map(item => (
                  <ItemGridCell key={item.id}>
                    <ItemCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      desc={item.desc}
                      date={item.created_at}
                      owner={item.owner.fullname}
                      email={item.owner.email}
                      ownerId={item.owner.id}
                      borrowerId={item.borrower.id}
                      disabled={!!item.borrower}
                      tags={item.tags}
                      imageUrl={
                        item.image_url &&
                        process.env.NODE_ENV === 'production'
                          ? `/uploads/${item.image_url}`
                          : `http://localhost:8080/uploads/${item.image_url}`
                      }
                    />
                  </ItemGridCell>
                ))}
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
