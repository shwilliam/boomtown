import React from 'react'
import MenuBar from '../../components/MenuBar'
import {grey} from '@material-ui/core/colors'
import {makeStyles} from '@material-ui/core/styles'
import {Paper} from '@material-ui/core'

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
