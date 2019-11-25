import React from 'react'
import {Paper} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import {makeStyles} from '@material-ui/core/styles'
import MenuBar from '../../components/MenuBar'

const useLayoutStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  rootDark: {
    padding: theme.spacing(2),
    backgroundColor: grey[900],
  },
}))

const Layout = ({dark = false, children, ...props}) => {
  const {root, rootDark} = useLayoutStyles()

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
