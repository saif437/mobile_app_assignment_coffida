import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, AsyncStorage } from 'react-native'
import { RNCamera } from 'react-native-camera'

class PhotoScreen extends Component {
  constructor (props) {
    super(props)
  }

  addPhoto = async (locId, revId) => {
    const token = await AsyncStorage.getItem('@session_token')
    if(this.camera){
      const options = {quality:0.5,base64:true}
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri)
      return fetch('http://10.0.2.2:3333/api/1.0.0/Location/'  + locId + '/review/'
        + revId + '/photo',
        {
          method: 'POST',
          headers: { 'Content-Type': 'image/jpeg', 'X-Authorization' : token },
          body: data,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log('ok')
          } else if (response.status === 400) {
            console.log('Bad request')
          } else if (response.status === 401) {
            console.log('Unauthorised')
          } else if (response.status === 404) {
            console.log('Not found')
          }else {
            console.log('Something went wrong')
          }
        })
        .then(async(responseJson) => {
          console.log('photo added')
          await AsyncStorage.getItem('@session_token')
          this.props.navigation.navigate('Home screen')
        })
        .catch((error) => {
          console.error(error)
        })
      }
    }

  render () {
    const { locId, revId } = this.props.route.params
    const navigation = this.props.navigation
    return(
      <View style={{flex: 1}}>
        <RNCamera 
        ref={ref=>{
        this.camera=ref
        }}
        style={{
          flex: 1,
          width: '100%',
        }}
        />
        <View>
          <TouchableOpacity onPress={()=> this.addPhoto(locId, revId)}>
            <Text>Take photo</Text>
          </TouchableOpacity>
        </View>
      </View>
      )
  }
}

export default PhotoScreen