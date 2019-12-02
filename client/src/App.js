import React from 'react'
import {ApolloProvider} from 'react-apollo'
import CssBaseline from '@material-ui/core/CssBaseline'
import {MuiThemeProvider} from '@material-ui/core/styles'
import {AuthContextProvider, ItemsContextProvider} from './context'
import apolloClient from './graphql'
import Router from './router'
import theme from './theme'

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <ApolloProvider client={apolloClient}>
      <AuthContextProvider>
        <ItemsContextProvider>
          <Router />
        </ItemsContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  </MuiThemeProvider>
)

export default App
