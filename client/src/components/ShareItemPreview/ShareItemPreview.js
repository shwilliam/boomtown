import React, {useContext} from 'react'
import {AuthContext, ShareItemContext} from '../../context'
import ItemCard from '../ItemCard'
import useStyles from './ShareItemPreview.styles'

const ShareItemPreview = props => {
  const {formValues} = useContext(ShareItemContext)
  const {activeUser} = useContext(AuthContext)
  const {root} = useStyles()

  return (
    <ItemCard
      title={formValues.title}
      desc={formValues.desc}
      owner={activeUser.user.fullname}
      email={activeUser.user.email}
      imageUrl={formValues.image}
      tags={formValues.tags}
      disabled={true}
      className={root}
      {...props}
    />
  )
}

export default ShareItemPreview
