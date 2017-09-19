import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import styled from 'styled-components/native'
import Loading from './Loading'
import { logout } from '../actions/user'
import ButtonHeader from './ButtonHeader'

const AVATAR_SIZE = 30
const AVATAR_RADIUS = AVATAR_SIZE / 2

const Avatar = styled.Image`
  height: ${AVATAR_SIZE}
  width: ${AVATAR_SIZE}
  borderRadius: ${AVATAR_RADIUS}
`

class HeaderAvatar extends Component {
  _logOutPress = () => {
    this.props.client.resetStore()
    this.props.logout()
  }

  render() {
    if(!this.props.info) {
      return (
        <ButtonHeader side="left" disabled>
          <Loading size="small"/>
        </ButtonHeader>
      )
    }
    return (
      <ButtonHeader side="left" onPress={this._logOutPress}>
        <Avatar source={{ uri: this.props.info.avatar }} />
      </ButtonHeader>
    )
  }
}

export default withApollo(connect(state => ({ info: state.user.info }), { logout })(HeaderAvatar))
