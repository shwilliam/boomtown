import React from 'react'
import {ApolloProvider} from 'react-apollo'
import {MuiThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import apolloClient from './graphql'
import Router from './router'
import theme from './theme'
import './index.css'

const App = () => (
  <ApolloProvider client={apolloClient}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </MuiThemeProvider>
  </ApolloProvider>
)

export default App
