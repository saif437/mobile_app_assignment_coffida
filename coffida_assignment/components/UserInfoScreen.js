 import React, { Component } from 'react'
import { Text, View, FlatList, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native'

class UserInfoScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading : true
    }
  }

  getData = async () =>{
    const token = await AsyncStorage.getItem('@session_token')
    const id = await AsyncStorage.getItem('@user_id')

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + id,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'X-Authorization':token  }
    })
    .then((repsonse) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 401) {
        console.log('Unauthorised')
      } else {
        console.log('Something went wrong')
      }
    })
    .then(async(repsonseJson) =>{
      console.log('got user details')
      await AsyncStorage.getItem('@session_token')
      console.log(repsonseJson)
      this.setState({
        isLoading:false,
        email:repsonseJson.email,
        firstName:repsonseJson.first_name,
        lastName:repsonseJson.last_name


      })
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  componentDidMount () {
    this.getData()
  }

  render(){
    if(this.state.isLoading){
      return(
        <View>
          <Text>Loading</Text>
        </View>
        )
    }else{
      return(
        <View>
          <Text>Email : {this.state.email}</Text>
          <Text>First name : {this.state.firstName}</Text>
          <Text>Last name : {this.state.lastName}</Text>
        </View>
        )
      } 
    }
  }

export default UserInfoScreen