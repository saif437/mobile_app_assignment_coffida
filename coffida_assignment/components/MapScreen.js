import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, PermissionsAndroid, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Geolocation from 'react-native-geolocation-service'

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
/* screen for displaying the location of coffee shops on google maps
will only work if connected to the internet and has access to the playstore
will find coordinates of a location and will set it to state
user must accept permissions for the Google maps to work
function will show the status of permissions and will act based of the result
display location thorugh MapView
 */
class MapScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: null,
      locationPermission: false,
      location:{
        longitude:0,
        latitude:0
      }
    }
  }

  /*
  Will find the call the request location function to request permission.
  Then will find and set the long and lat to state
  */
  findCoordinates (latitude, longitude) {
    if(!this.state.locationPermission){
      this.state.locationPermission=this.requestLocationPermission();
    }
    Geolocation.getCurrentPosition(
      (position)=>{
        const location = JSON.stringify(position);

        this.setState({ 
        location:{
          longitude:longitude,
          latitude:latitude
          }
        })
      },
      (error)=>{
        Alert.alert(error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000
      }
      )
  }

  /*
  Will check if the permissions are correct and accepted
  */
  requestLocationPermission = async () => {
    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title:'Lab04 Location Permission',
          message: 'This app requires access to your location',
          buttonNeutral:'Ask Me Later',
          buttonNegative:'Cancel',
          buttonPositive:'OK',
        },
        )
        if(granted===PermissionsAndroid.RESULTS.GRANTED){
          console.log('You can access location')
          return true
        } else{
          console.log('Location permission denied')
          Alert.alert('You can access this feature')
          return false        
        }
      } catch(err){
      console.warn(err)
    }
  }

  /*
  Will call findCoordinates immediately once screen is loaded
  */
  componentDidMount () {
    const { latitude, longitude } = this.props.route.params
    this.findCoordinates(latitude, longitude)
  }

  /*
  MapView is where the maps is displayed
  */
  render () {
    const navigation = this.props.navigation
    return(
      <View style={{flex:1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex:1}}
          region={{
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude,
            latitudeDelta:0.002,
            longitudeDelta:0.002 
          }}
        >
          <Marker
            coordinate={this.state.location}
            title='location'
            description='Here I am'
          />
        </MapView>
      </View>
      )
  }
}
export default MapScreen