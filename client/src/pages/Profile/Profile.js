import React from 'react'
import Layout from '../../components/Layout'
import ProfileCard from '../../components/ProfileCard'

const Profile = () => (
  <Layout dark={true}>
    <ProfileCard
      fullname={'name'}
      bio={null}
      itemsShared={2}
      itemsBorrowed={3}
    />
  </Layout>
)

export default Profile
