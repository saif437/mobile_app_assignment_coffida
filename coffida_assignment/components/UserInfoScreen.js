 import React, { Component } from 'react'
import { Text, View, FlatList, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native'

class UserInfoScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading : true,
      userInfoData: []
    }
  }

  getData = async () =>{
    const token = await AsyncStorage.getItem('@session_token')
    const id = await AsyncStorage.getItem('@user_id')
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'X-Authorization':token  },
    })
    .then((repsonse) => repsonse.json())
    .then(async(repsonseJson) =>{
      console.log('got user details')
      await AsyncStorage.getItem('@session_token')
      this.setState({
        isLoading:false,
        userInfoData:repsonseJson
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
          <ActivityIndicator />
        </View>
        )
    }

    return(
      <View>
        <FlatList
        data={this.state.userInfoData}
        renderItem={({item})=><Text>{item.item_name}</Text>}
        keyExtractor={({id},index)=>id}/>
      </View>
    )
  }
}

export default UserInfoScreen