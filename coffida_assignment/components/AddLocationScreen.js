import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

class AddLocationScreen extends Component {
  render () {
    const navigation = this.props.navigation

    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Home screen')}>
          <Text>Home screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default AddLocationScreen
