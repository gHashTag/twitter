/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import {
  AppRegistry,
  UIManager,
} from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import { store, client } from './src/store'
import { colors } from './src/utils/constants'

import AppNavigation from './src/navigations'


if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default class mobile extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <ThemeProvider theme={colors}>
          <AppNavigation />
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

AppRegistry.registerComponent('mobile', () => mobile)
