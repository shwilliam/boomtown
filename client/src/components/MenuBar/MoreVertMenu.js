import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Menu, MenuItem, IconButton} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

const MoreVertMenu = props => {
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
        <MenuItem onClick={() => setAnchor()}>
          <PowerSettingsNewIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default MoreVertMenu
