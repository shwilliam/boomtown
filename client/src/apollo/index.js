import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {ApolloLink} from 'apollo-link'
import {onError} from 'apollo-link-error'
import {createHttpLink} from 'apollo-link-http'

const httpLink = createHttpLink({
  includeExtensions: true,
  uri:
    process.env.NODE_ENV === 'production'
      ? '/graphql'
      : 'http://localhost:8080/graphql',
  credentials:
    process.env.NODE_ENV === 'production' ? 'same-origin' : 'include',
})

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({graphQLErrors, networkError}) => {
      // Log better error messages to console
      if (graphQLErrors) {
        graphQLErrors.map(({message, locations, path}) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      }
      if (networkError)
        console.log(`[Network error]: ${networkError}`)
    }),
    httpLink,
  ]),
  cache: new InMemoryCache(),
})

export default client
