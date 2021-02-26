import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'

import { emailValidation, passwordValidation } from './helperFunctions'

/*
Create account assist users in registering an account by displaying text input
 components to prompt the user to enter their details and a post request is sent to
 the api create the account
 */
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

  /*
  createAccount function will validate the user's email and password
  by checking an external function called emailValidation and PasswordValidation.
  Will proceed to post request if successful.
  */
  createAccount (emailParam, passwordParam) {
    if (emailValidation(emailParam) === true && passwordValidation(passwordParam) === true) {
      this.postRequest()
    }
  }

  /*
  posts request which returns 201 if succesffull or 400 if validations is not correct
  */
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
      <View style={styles.container}>
        <ScrollView>
          <TextInput
            style={styles.InputText}
            placeholder='First name: '
            onChangeText={(firstName) => this.setState({ firstName })}
            value={this.state.firstName}
          />
          <TextInput
            style={styles.InputText}
            placeholder='Last name: '
            onChangeText={(lastName) => this.setState({ lastName })}
            value={this.state.lastName}
          />
          <TextInput
            style={styles.InputText}
            placeholder='Email: '
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={styles.InputText}
            placeholder='Password: '
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry
            value={this.state.password}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.createAccount(this.state.email, this.state.password)}
          >
            <Text style={styles.boldText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login screen')}
          >
            <Text style={styles.boldText}>Go Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727'
  },
  InputText: {
    backgroundColor: '#747474',
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 5,
    borderColor: '#14a76c',
    borderRadius: 6,
    marginBottom: 10,
    marginTop: 10

  },
  button: {
    borderWidth: 5,
    borderColor: '#14a76c',
    borderRadius: 6,
    paddingVertical: 10,
    marginBottom: 10
  },
  boldText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ff652f'
  }
})

export default CreateAccountScreen
