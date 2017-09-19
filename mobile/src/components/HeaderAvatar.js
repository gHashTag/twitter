import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import Touchable from '@appandflow/touchable'
import Loading from './Loading'
import { withApollo } from 'react-apollo'
import { logout } from '../actions/user'

const AVATAR_SIZE = 30
const AVATAR_RADIUS = AVATAR_SIZE / 2

const Avatar = styled.Image`
  height: ${AVATAR_SIZE}
  width: ${AVATAR_SIZE}
  borderRadius: ${AVATAR_RADIUS}
`

const Button = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
})`
  marginLeft: 15
  justifyContent: center
  alignItems: center
`


class HeaderAvatar extends Component {
  _logOutPress = () => {
    this.props.client.resetStore()
    this.props.logout()
  }

  render() {
    if(!this.props.info) {
      return (
        <Button disabled>
          <Loading size="small"/>
        </Button>
      )
    }
    return (
      <Button onPress={this._logOutPress}>
        <Avatar source={{ uri: this.props.info.avatar }} />
      </Button>
    )
  }
}

export default withApollo(connect(state => ({ info: state.user.info }), { logout })(HeaderAvatar))
