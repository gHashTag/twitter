import React from 'react'
import styled from 'styled-components/native'
import Touchable from '@appandflow/touchable'
// import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../utils/constants'

const ICON_SIZE = 23

const Root = styled.View`
  height: 40
  flexDirection: row
`
const Bottom = styled(Touchable).attrs({
  feedback: 'opacity'
})`
  flex: 1
  flexDirection: row
  alignItems: center
  justifyContent: space-around
  paddingHorizontal:  32px
`
const ButtonText = styled.Text`
  fontSize: 14
  fontWeight: 500
  color: ${props => props.theme.LIGHT_GRAY}
`

function FeedCardBottom({ favoriteCount, onFavoritePress, isFavorited }) {
  return (
    <Root>
      <Bottom>
        <Ionicons name="ios-chatbubbles-outline" size={ICON_SIZE} color={colors.LIGHT_GRAY} />
        <ButtonText>
          0
        </ButtonText>
      </Bottom>
      <Bottom>
        <Ionicons name="md-repeat" size={ICON_SIZE} color={colors.LIGHT_GRAY} />
        <ButtonText>
          0
        </ButtonText>
      </Bottom>
      <Bottom onPress={onFavoritePress}>
        <Ionicons name="ios-heart" size={ICON_SIZE} color={isFavorited ? 'red' : colors.LIGHT_GRAY} />
        <ButtonText>
          {favoriteCount} 
        </ButtonText>
      </Bottom>
    </Root>
  )
}

export default FeedCardBottom 
