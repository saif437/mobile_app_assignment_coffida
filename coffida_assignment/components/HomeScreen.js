import React, { Component } from 'react'
import { Text, View, TouchableOpacity, AsyncStorage, FlatList, PermissionAndroid, Picker } from 'react-native'


class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading : true,
      locationData: [],
      selectedValue: ''
    }
  }

  getLocations = async () =>{
    const token = await AsyncStorage.getItem('@session_token')
    console.log(token)
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
    .then(async(responseJson) =>{
      console.log('Locations Found', responseJson)
      await AsyncStorage.getItem('@session_token')
      this.setState({
        isLoading:false,
        locationData:responseJson
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
          <Picker 
          selectedValue={this.state.selectedValue}
          onValueChange={(itemValue)=> this.setState({
            selectedValue:itemValue
          })}>
            <Picker.Item label='sort by rating' value='sort by rating' />
            <Picker.Item label='sort by price' value='sort by price'  />
            <Picker.Item label='sort by quality' value='sort by quality'  />
            <Picker.Item label='sort by clenliness' value='sort by clenliness' />


          </Picker>
          <FlatList
          data={this.state.locationData}
          renderItem={({ item }) => (
            <View style={{flex:75}}>
              <TouchableOpacity onPress={() => navigation.navigate('Location Info screen',{locId:item.location_id.toString(),})}>
                <View>
                  <Text>{item.location_name}</Text>
                  <Text>{item.location_town}</Text>
                </View>
              </TouchableOpacity> 
              <TouchableOpacity onPress={() => navigation.navigate('Map screen',{latitude:item.latitude, longitude:item.longitude,})}>
                <View>
                  <Text>Show location on Google maps</Text>
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