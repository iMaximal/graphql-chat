import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import App from './containers/App/App'

const wsLink = new WebSocketLink({

  uri: 'wss://subscriptions.graph.cool/v1/cjcz23o120dz20153qofzqgmf',
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjcz23o120dz20153qofzqgmf' })

// The split method takes three arguments.
// The first is a test that returns a boolean. If the boolean value is true, the request is forwarded to the second (wsLink) argument.
// If false, it's forwarded to the third (httpLink) argument.

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)
const client = new ApolloClient({

  link,
  cache: new InMemoryCache()
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

registerServiceWorker()
