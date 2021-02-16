import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, AsyncStorage} from 'react-native'
import { emailValidation, passwordValidation } from './helperFunctions'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }



  handleLogin = async (emailParam, passwordParam) => {
    if (emailValidation(emailParam) === true && passwordValidation(passwordParam) === true) {

      return fetch('http://10.0.2.2:3333/api/1.0.0/user/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
        })
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else if (response.status === 400) {
            console.log('Invalid email/password supplied')
          } else {
            console.log('Something went wrong')
          }
        })
        .then(async (responseJson) => {
          console.log('Logged in', responseJson)
          await AsyncStorage.setItem('@session_token', responseJson.token)
          await AsyncStorage.setItem('@user_id', responseJson.id.toString())
          this.props.navigation.navigate('Home screen')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  render () {
    const navigation = this.props.navigation

    return (
      <View>
        <TextInput
          placeholder='Email: '
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder='Password: '
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry
          value={this.state.password}
        />
        <TouchableOpacity onPress={() => this.handleLogin(this.state.email, this.state.password)}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Create account screen')}>
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default LoginScreen
