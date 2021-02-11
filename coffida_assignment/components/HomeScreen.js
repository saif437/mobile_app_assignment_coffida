import React, { Component } from 'react'
import { Text, View, TouchableOpacity, AsyncStorage, FlatList } from 'react-native'

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading : true,
      locationData: []
    }
  }



  getLocations = async () =>{
    const token = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/find',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'X-Authorization':token  },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 400) {
        console.log('Bad request')
      } else if (response.status === 401){
        console.log('Unauthorised')
      }else {
        console.log('Something went wrong')
      }
    })
    .then(async(repsonseJson) =>{
      console.log('Locations Found', repsonseJson)
      await AsyncStorage.getItem('@session_token')
      this.setState({
        isLoading:false,
        locationData:repsonseJson
      })
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  componentDidMount () {
    this.getLocations()
  }
  render () {
    const navigation = this.props.navigation
    if(this.state.isLoading){
      return(
        <View>
          <Text>Loading</Text>
        </View>
        )
    }else{
      return(
        <View>
          <FlatList
          data={this.state.locationData}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Location Info screen',{locId:item.location_id.toString(),})}>
                <View>
                  <Text>{item.location_name}</Text>
                  <Text>{item.location_town}</Text>
                </View>
              </TouchableOpacity> 
            </View>
            )}
          keyExtractor={({location_id},index) => location_id.toString()} 
          />
        </View>
        )
      } 
    }
  }
export default HomeScreen