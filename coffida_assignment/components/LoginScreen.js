import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import { emailValidation, passwordValidation } from './helperFunctions'
import AsyncStorage from '@react-native-async-storage/async-storage'
/* 
Login screen will provide the user to login and register
*/
class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  
  /*
  Post request to log the user in and will navigate to the home screen.
  Email and password is validated first by the validation functions imported
  */
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

  /*
  Will display a standard styled login screen
  */
  render () {
    const navigation = this.props.navigation

    return (
      <View style={styles.container}>
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
        onPress={() => this.handleLogin(this.state.email, this.state.password)}>
          <Text style={styles.boldText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Create account screen')}>
          <Text style={styles.boldText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: '#272727'
  },
  InputText:{
    backgroundColor: '#747474',
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 5,
    borderColor: "#14a76c",
    borderRadius: 6,
    marginBottom: 10,
    marginTop: 10

  },
  button:{
    borderWidth: 5,
    borderColor: "#14a76c",
    borderRadius: 6,
    paddingVertical: 10,
    marginBottom: 10
  },
  boldText:{
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ff652f'
  }
})

export default LoginScreen
