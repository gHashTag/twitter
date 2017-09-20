import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { addNavigationHelpers, StackNavigator, TabNavigator } from  'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { colors } from './utils/constants'

import AuthenticationScreen from './screens/AuthenticationScreen' 
import NewTweetScreen from './screens/NewTweetScreen' 
import HomeScreen from './screens/HomeScreen'
import ExploreScreen from './screens/ExploreScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import ProfileScreen from './screens/ProfileScreen'
import HeaderAvatar from './components/HeaderAvatar'
import ButtonHeader from './components/ButtonHeader'

const TAB_ICON_SIZE = 25

const Tabs = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      headerTitle: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons size={TAB_ICON_SIZE} color={tintColor} name="ios-home"/>
      )
    }) 
  },
  Explore: {
    screen: ExploreScreen,
    navigationOptions: () => ({
      headerTitle: 'Explore',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons size={TAB_ICON_SIZE} color={tintColor} name="ios-search"/>
      )
    }) 
  },
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: () => ({
      headerTitle: 'Notifications',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons size={TAB_ICON_SIZE} color={tintColor} name="ios-flash"/>
      )
    }) 
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      headerTitle: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons size={TAB_ICON_SIZE} color={tintColor} name="ios-contact"/>
      )
    }) 
  },
}, {
  lazy: true,
  tabBarPosision: 'bottom',
  swipeEnable: false,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: colors.PRIMARY,
    inactiveTintConor: colors.LIGHT_GRAY,
    style: {
      backgroundColor: colors.WHITE,
      height: 50,
      paddingVertical: 5
    }
  }
})

const NewTweetModal = StackNavigator(
  {
    NewTweet: {
      screen: NewTweetScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <ButtonHeader side="right" onPress={() => {
            Keyboard.dismiss()
            navigation.goBack(null)
          }}>
            <Ionicons size={25} color={colors.PRIMARY} name="md-close"/>
          </ButtonHeader>
        )
      })
    }
  }, {
    headerMode: 'none'
  }
)

const AppMainNav = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderAvatar />,
      headerRight: (
        <ButtonHeader side="right" onPress={() => navigation.navigate('NewTweet')}>
          <Ionicons size={25} color={colors.PRIMARY} name="md-create"/>
        </ButtonHeader>
      )
    })
  },
  NewTweet: {
    screen: NewTweetModal
  }
}, {
  cardStyle: {
    backgroundColor: '#F1F6FA'
  },
  navigationOptions: () => ({
    headerStyle: {
      backgroundColor: colors.WHITE
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: colors.SECONDARY
    }
  }) 
})

class AppNavigation extends Component {
  render() {
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav 
    })
    if (!this.props.user.isAuthenticated) {
      return <AuthenticationScreen />
    }
    return <AppMainNav navigation={nav} /> 
  }
}

export default connect(state => ({
  nav: state.nav,
  user: state.user
}))(AppNavigation)

export const router = AppMainNav.router
