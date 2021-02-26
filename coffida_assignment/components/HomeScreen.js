import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, PermissionAndroid, Picker, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
/* 
The main screen for this application, will show a list of locations of different coffee shops with their location details
*/
class HomeScreen extends Component {
  /*
  locationData is where the location infomation is stored and will be retrieved
  */
  constructor (props) {
    super(props)
    this.state = {
      isLoading : true,
      locationData: [],
      selectedValue: ''
    }
  }

  /*
  Get request to find locations and their information.
  responseJson will contain the get request information and this will be added into 
  locationData list to access in the render function
  */
  getLocations = async () => {
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
  /*
  As soon as the home screen is accessed, it will called getLocations to retrieve a list of locations
  */
  componentDidMount () {
    this.getLocations()
  }

  /*
  A flatlist is used to access items in locationData list. This is displayd in a styled manner
  */
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
          <FlatList
          data={this.state.locationData}
          renderItem={({ item }) => (
            <ScrollView>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Location Info screen',{locId:item.location_id.toString(),})}>
                <Text style={styles.boldText}>{item.location_name}</Text>
                <Text style={styles.boldText}>{item.location_town}</Text>
                <Text style={styles.boldText}>Avg rating: {item.avg_overall_rating}</Text>
                <Text style={styles.boldText}>Avg clenliness: {item.avg_clenliness_rating}</Text>
                <Text style={styles.boldText}>Avg price: {item.avg_price_rating}</Text>
                <Text style={styles.boldText}>Avg quality: {item.avg_quality_rating}</Text>
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
  }
})
export default HomeScreen