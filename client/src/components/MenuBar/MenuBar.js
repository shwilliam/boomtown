import React from 'react'
import {useHistory} from 'react-router-dom'
import {
  AppBar,
  Fab,
  Icon,
  IconButton,
  Toolbar,
} from '@material-ui/core'
import MoreVertMenu from './MoreVertMenu'
import logoSrc from '../../images/boomtown.svg'
import useStyles from './MenuBar.styles'

const MenuBar = props => {
  const history = useHistory()
  const {
    margin,
    menuButton,
    menuButtonIcon,
    shareButton,
  } = useStyles()

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
          {/* TODO: ensure semantic heading tags */}
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
            className={shareButton}
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
