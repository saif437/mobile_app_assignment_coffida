import React, { Component } from 'react'
import { Text, View, FlatList, AsyncStorage, TouchableOpacity, ActivityIndicator, ScrollView, TextInput } from 'react-native'

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
          <TouchableOpacity onPress={()=> this.updateData()}>
            <Text>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      )
    }
  }

export default UserInfoScreen