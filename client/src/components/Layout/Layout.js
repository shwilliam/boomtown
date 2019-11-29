import React from 'react'
import {Paper} from '@material-ui/core'
import MenuBar from '../../components/MenuBar'
import useStyles from './Layout.styles'

const Layout = ({dark = false, children, ...props}) => {
  const {root, rootDark} = useStyles()

  return (
    <>
      <MenuBar />
      <Paper className={dark ? rootDark : root} {...props}>
        {children}
      </Paper>
    </>
  )
}

export default Layout
