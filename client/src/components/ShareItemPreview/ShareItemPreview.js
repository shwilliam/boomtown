import React, {useContext} from 'react'
import ItemCard, {ItemTag} from '../ItemCard'
import {ShareItemContext, AuthContext} from '../../context'
import {capitalize} from '../../utils'

const ShareItemPreview = props => {
  const {formValues} = useContext(ShareItemContext)
  const {activeUser} = useContext(AuthContext)

  return (
    <ItemCard
      title={formValues.title}
      desc={formValues.desc}
      owner={activeUser.user.fullname}
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
