import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'

import { emailValidation, passwordValidation } from './helperFunctions'

class CreateAccountScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  createAccount (emailParam, passwordParam) {
    if (emailValidation(emailParam) === true && passwordValidation(passwordParam) === true) {
      this.postRequest()
    }
  }

  postRequest () {
    return fetch('http://10.0.2.2:3333/api/1.0.0/user',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        })
      })
      .then((response) => {
        if (response.status === 201) {
          return response.json()
        } else if (response.status === 400) {
          console.log('Failed Validation')
        } else {
          console.log('Something went wrong')
        }
      })
      .then((responseJson) => {
        console.log('User account created', responseJson)
        this.props.navigation.navigate('Login screen')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    return (
      <View>
        <ScrollView>
          <TextInput
            placeholder='First name: '
            onChangeText={(firstName) => this.setState({ firstName })}
            value={this.state.firstName}
          />
          <TextInput
            placeholder='Last name: '
            onChangeText={(lastName) => this.setState({ lastName })}
            value={this.state.lastName}
          />
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
          <TouchableOpacity onPress={() => this.createAccount(this.state.email, this.state.password)}>
            <Text>Create</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default CreateAccountScreen
