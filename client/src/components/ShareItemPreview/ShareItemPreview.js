import React, {useContext} from 'react'
import {AuthContext, ShareItemContext} from '../../context'
import ItemCard from '../ItemCard'

const ShareItemPreview = props => {
  const {formValues} = useContext(ShareItemContext)
  const {activeUser} = useContext(AuthContext)

  return (
    <ItemCard
      title={formValues.title}
      desc={formValues.desc}
      owner={activeUser.user.fullname}
      email={activeUser.user.email}
      imageUrl={formValues.image}
      tags={formValues.tags}
      disabled={true}
      {...props}
    />
  )
}

export default ShareItemPreview
