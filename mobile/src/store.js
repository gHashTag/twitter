/* eslint-disable no-param-reassign */
import { createStore, applyMiddleware } from 'redux'
import { AsyncStorage } from 'react-native'
import { composeWithDevTools } from 'redux-devtools-extension'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import reducers from './reducers'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql',
})

networkInterface.use([{
  async applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    try {
      const token = await AsyncStorage.getItem('@twitteryourtubeclone') 
      if (token != null) {
        req.options.headers.authorization = `Bearer ${token} || null`
      }  
    } catch (e) {
      throw e
    }
    return next()
  }
}])

export const client = new ApolloClient({
  networkInterface,
})

const middlewares = [client.middleware(), thunk, logger]

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
)
