import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

class HomeScreen extends Component {
  render () {
    const navigation = this.props.navigation

    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Review screen')}>
          <Text>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Add location screen')}>
          <Text>Add location</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default HomeScreen
