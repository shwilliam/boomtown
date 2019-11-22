import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {Menu, MenuItem, IconButton} from '@material-ui/core'
import {
  MoreVert as MoreVertIcon,
  Fingerprint as FingerprintIcon,
  PowerSettingsNew as PowerSettingsNewIcon,
} from '@material-ui/icons'
import AuthContext from '../../context/AuthContext'

const MoreVertMenu = props => {
  const {logout} = useContext(AuthContext)
  const [anchor, setAnchor] = useState()
  const history = useHistory()

  return (
    <>
      <IconButton
        aria-label="More settings"
        aria-controls="more-vert-menu"
        aria-haspopup="true"
        onClick={e => setAnchor(e.currentTarget)}
        {...props}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="more-vert-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={() => setAnchor()}
      >
        <MenuItem
          onClick={() => setAnchor() || history.push('/profile')}
        >
          <FingerprintIcon />
          Your Profile
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <PowerSettingsNewIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default MoreVertMenu
