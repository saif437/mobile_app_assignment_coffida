import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, AsyncStorage, StyleSheet } from 'react-native'

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
      <View style={styles.container}>
        <Text style={styles.boldText}>Are you sure you want to log out?</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.handleLogout()}>
          <Text style={styles.boldText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home screen')}>
          <Text style={styles.boldText}>No</Text>
        </TouchableOpacity>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: '#272727',

  },
  button:{
    borderWidth: 5,
    borderColor: "#14a76c",
    borderRadius: 6,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10
  },
  boldText:{
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ff652f'
  }
})


export default LogoutScreen