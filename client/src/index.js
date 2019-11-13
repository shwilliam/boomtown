import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ApolloProvider} from 'react-apollo'
import apolloClient from './apollo'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
