import React from 'react'
import Router from './router'
import {MuiThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import './index.css'

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router />
  </MuiThemeProvider>
)

export default App
