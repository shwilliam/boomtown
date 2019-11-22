import React, {useContext} from 'react'
import ItemCard, {ItemTag} from '../ItemCard'
import {ShareItemContext, GQLContext} from '../../context'
import {capitalize} from '../../utils'

const ShareItemPreview = props => {
  const {formValues} = useContext(ShareItemContext)
  const {userData} = useContext(GQLContext)

  return (
    <ItemCard
      title={formValues.title}
      desc={formValues.desc}
      owner={userData.viewer.fullname}
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
