import React, { Component } from 'react'
import { Text, View, TouchableOpacity, AsyncStorage, FlatList, PermissionAndroid, Picker, StyleSheet, ScrollView } from 'react-native'


/* 
The main screen for this application, will show a list of locations of different coffee shops with their location 
get request to retrieve a list of locations stored in responseJson
async storage is used to access the user's session token which is generated everytime the user logs in
will automatically call getLocations to display locations immediately 
flatlist will loop through each element in location data to access information on each locations
and have access to location ID's which will allowed the user to enter a specifc location
conditional statement to add a filler text when data is loading 
Allows users to filter results by sorting
*/


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
        <View style={styles.container}>
          <Text style={styles.text}>Loading</Text>
        </View>
        )
    }else{
      return(
        <View style={styles.container}>
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
            <ScrollView>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Location Info screen',{locId:item.location_id.toString(),})}>
                <Text style={styles.boldText}>{item.location_name}</Text>
                <Text style={styles.boldText}>{item.location_town}</Text>
              </TouchableOpacity> 
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map screen',{latitude:item.latitude, longitude:item.longitude,})}>
                <Text style={styles.boldText}>Show location on Google maps</Text>
              </TouchableOpacity> 
            </ScrollView>
            )}
          keyExtractor={({location_id},index) => location_id.toString()} 
          />
        </View>
        )
      } 
    }
  }

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: '#272727'

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
  },
  pick:{
    alignItems: 'center',
    backgroundColor: 'white'
  }
})
export default HomeScreen