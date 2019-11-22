import React from 'react'
import {useHistory} from 'react-router-dom'
import {
  AppBar,
  Fab,
  Toolbar,
  Icon,
  IconButton,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import MoreVertMenu from './MoreVertMenu'
import logoSrc from '../../images/boomtown.svg'

const useMenuBarStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  menuButton: {
    marginRight: 'auto',
  },
  menuButtonIcon: {
    height: '50px',
  },
}))

const MenuBar = props => {
  const history = useHistory()
  const {margin, menuButton, menuButtonIcon} = useMenuBarStyles()

  return (
    <AppBar position="static" {...props}>
      <Toolbar>
        <IconButton
          edge="start"
          className={menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => history.push('/')}
        >
          <img
            alt="Boomtown"
            className={menuButtonIcon}
            src={logoSrc}
          />
        </IconButton>
        {history.location.pathname !== '/share' && (
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            onClick={() => history.push('/share')}
          >
            <Icon className={margin}>add_circle</Icon>
            Share something
          </Fab>
        )}
        <MoreVertMenu />
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar
