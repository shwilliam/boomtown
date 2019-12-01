import React from 'react'
import PropTypes from 'prop-types'
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

Layout.propTypes = {
  dark: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Layout
