import React, { Component } from 'react'
import { Text, View, FlatList, AsyncStorage, TouchableOpacity, ActivityIndicator, ScrollView, TextInput, StyleSheet } from 'react-native'

class UserInfoScreen extends Component {
  constructor (props) {
    super(props)
    const { emailParam, firstNameParam, lastNameParam } = this.props.route.params
    this.state = {
      origFirstName: firstNameParam,
      origLastName: lastNameParam,
      origEmail: emailParam,
    }
  }

  updateData = async () =>{
    let userInfo = {}
    if(this.state.email != this.state.origEmail){
      userInfo['email'] = this.state.email
    }
    if(this.state.firstName != this.state.origFirstName){
      userInfo['first_name'] = this.state.firstName
    }
    if(this.state.lastName != this.state.lastName){
      userInfo['last_name'] = this.state.lastName
    }
    const token = await AsyncStorage.getItem('@session_token')
    const id = await AsyncStorage.getItem('@user_id')

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + id,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-Authorization':token  },
      body: JSON.stringify(userInfo)
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('Ok')
        console.log(userInfo)
        this.props.navigation.navigate('User Info Screen')
        return response.json()
      } else if (response.status === 400) {
        console.log('Bad request')
      } else if (response.status === 401) {
        console.log('Unauthorised')
      } else if (response.status === 403) {
        console.log('Forbidden')
      } else if (response.status === 404) {
        console.log('Not found')
      } else {
        console.log('Something went wrong')
      }
    })
    /*.then(async(responseJson) =>{
      console.log('Updated user details')
      await AsyncStorage.getItem('@session_token')
      console.log(responseJson)
      this.props.navigation.navigate('User Info Screen')
    })*/
    .catch((error) =>{
      console.log(error)
    })
  }


  render(){
    return(
      <View style={styles.container}>
        <ScrollView>
          <TextInput style={styles.InputText}
            placeholder='First name: '
            onChangeText={(firstName) => this.setState({ firstName })}
            value={this.state.firstName}
          />
          <TextInput style={styles.InputText}
            placeholder='Last name: '
            onChangeText={(lastName) => this.setState({ lastName })}
            value={this.state.lastName}
          />
          <TextInput style={styles.InputText}
            placeholder='Email: '
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <TouchableOpacity style={styles.button} onPress={()=> this.updateData()}>
            <Text style={styles.boldText}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      )
    }
  }
const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: '#272727',
    justifyContent: 'space-between'

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
export default UserInfoScreen