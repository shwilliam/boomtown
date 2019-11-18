import React, {useContext} from 'react'
import {ItemCard, ItemTag} from '../ItemGrid'
import {ShareItemContext, GQLContext} from '../../context'

const ShareItemPreview = props => {
  const {formValues} = useContext(ShareItemContext)
  const {userData} = useContext(GQLContext)

  return (
    <ItemCard
      title={formValues.title}
      desc={formValues.desc}
      date="Just now"
      owner={userData.viewer.fullname}
      disabled={true}
      {...props}
    >
      {formValues.tags && formValues.tags.length
        ? formValues.tags.map(({id, title}) => (
            <ItemTag key={id} id={id}>
              {title}
            </ItemTag>
          ))
        : null}
    </ItemCard>
  )
}

export default ShareItemPreview
