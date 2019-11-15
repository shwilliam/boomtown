import React, {useContext} from 'react'
import {ItemCard, ItemTag} from '../ItemGrid'
import {ShareItemContext} from '../../context'

const OWNER = {fullname: 'Greg Bananas'}

const ShareItemPreview = props => {
  const {formValues} = useContext(ShareItemContext)

  return (
    <ItemCard
      title={formValues.title}
      desc={formValues.desc}
      date="Just now"
      owner={OWNER.fullname}
      disabled={true}
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
