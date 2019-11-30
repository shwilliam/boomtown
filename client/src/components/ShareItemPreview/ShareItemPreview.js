import React, {useContext} from 'react'
import {AuthContext, ShareItemContext} from '../../context'
import {capitalize} from '../../utils'
import ItemCard, {ItemTag} from '../ItemCard'

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
      date="Just now"
      disabled={true}
      {...props}
    >
      {formValues.tags && formValues.tags.length
        ? formValues.tags.map(({id, title}) => (
            <ItemTag key={id} id={id}>
              {capitalize(title)}
            </ItemTag>
          ))
        : null}
    </ItemCard>
  )
}

export default ShareItemPreview
