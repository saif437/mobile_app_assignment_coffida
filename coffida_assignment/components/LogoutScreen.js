import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, AsyncStorage } from 'react-native'

class LogoutScreen extends Component {
 
  handleLogout = async () => {
    const token = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Authorization':token  },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log('OK')
          } else if (response.status === 401) {
            console.log('Unauthorised')
          } else {
            console.log('Something went wrong')
          }
        })
        .then(async (responseJson) => {
          console.log('Logged Out')
          await AsyncStorage.getItem('@session_token')
          this.props.navigation.navigate('Login screen')
        })
        .catch((error) => {
          console.error(error)
        })
    
  }

  render(){
    const navigation = this.props.navigation
    return(
      <View>
        <Text>Are you sure you want to log out?</Text>
        <TouchableOpacity onPress={() => this.handleLogout()}>
          <Text>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home screen')}>
          <Text>No</Text>
        </TouchableOpacity>
      </View>
      )
  }
}

export default LogoutScreen