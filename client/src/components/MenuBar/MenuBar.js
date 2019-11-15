import React from 'react'
import {useHistory} from 'react-router-dom'
import {
  AppBar,
  Fab,
  Toolbar,
  Icon,
  IconButton,
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import styles from './styles'
import MoreVertMenu from './MoreVertMenu'
import logoSrc from '../../images/boomtown.svg'

const MenuBar = ({classes, ...props}) => {
  const history = useHistory()

  return (
    <AppBar position="static" {...props}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => history.push('/')}
        >
          <img
            alt="Boomtown"
            className={classes.menuButtonIcon}
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
            <Icon className={classes.margin}>add_circle</Icon>
            Share something
          </Fab>
        )}
        <MoreVertMenu />
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(MenuBar)
