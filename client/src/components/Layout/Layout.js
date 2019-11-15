import React from 'react'
import MenuBar from '../../components/MenuBar'
import {withStyles} from '@material-ui/core/styles'
import {Paper} from '@material-ui/core'
import styles from './styles'

const Layout = ({classes, children, ...props}) => (
  <>
    <MenuBar />
    <Paper className={classes.paper} {...props}>
      {children}
    </Paper>
  </>
)

export default withStyles(styles)(Layout)
