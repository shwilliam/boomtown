import React from 'react'
import {ApolloProvider} from 'react-apollo'
import {AuthContextProvider} from './context'
import apolloClient from './graphql'
import Router from './router'

import {MuiThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

const App = () => (
  <ApolloProvider client={apolloClient}>
    <AuthContextProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </MuiThemeProvider>
    </AuthContextProvider>
  </ApolloProvider>
)

export default App
