import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

class HomeScreen extends Component {
  render () {
    const navigation = this.props.navigation

    return (
      <View>
        <Text>Home Screen</Text>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
          <Text>Contact</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default HomeScreen
