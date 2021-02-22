import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, AsyncStorage, ScrollView, Image, Alert } from 'react-native'
import { Heart } from 'react-native-shapes'


class LocationInfoScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      locationData: [],
      locationReviews: [],
      favourite: false
    }
  }

  getSpecificLocation (locId) {

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locId,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
    .then((response) => {
      if (response.status === 200){
        return response.json()
      } else if (response.status === 404){
        console.log('Not Found')
      } else {
        console.log('Something went wrong')
      }
    })
    .then((responseJson) => {
      console.log('Locations Found', responseJson)
      this.setState({
        isLoading: false,
        locationData: responseJson,
        avgClenlinessRating: responseJson.avg_clenliness_rating,
        avgOverallRating: responseJson.avg_overall_rating,
        avgPriceRating: responseJson.avg_price_rating,
        avgQualityRating: responseJson.avg_quality_rating,
        locationName: responseJson.location_name,
        locationReviews: responseJson.location_reviews,
        locationTown: responseJson.location_town,
        photoPath: responseJson.photo_path
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

  favouriteLocation = async (locId) => {
    const token = await AsyncStorage.getItem('@session_token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locId + '/favourite',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Authorization':token }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('OK')
      } else if (response.status === 400) {
        console.log('Bad request')
      } else if (response.status === 401){
        console.log('Unauthorised')
      }
      else if (response.status === 404){
        console.log('Not Found')
      } else {
        console.log('Something went wrong')
      }
    })
    .then(async (responseJson) => {
      console.log('Favourite a location successfull')
      await AsyncStorage.getItem('@session_token')
    })
    .catch((error) => {
      console.error(error)
    })
  }

  unFavouriteLocation = async (locId) => {
    const token = await AsyncStorage.getItem('@session_token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locId + '/favourite',
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-Authorization':token }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('OK')
      } else if (response.status === 401){
        console.log('Unauthorised')
      } else if (response.status === 403){
        console.log('Forbidden')
      } else if (response.status === 404){
        console.log('Not Found')
      } else {
        console.log('Something went wrong')
      }
    })
    .then(async (responseJson) => {
      console.log('Unfavourite a location successfull')
      await AsyncStorage.getItem('@session_token')
    })
    .catch((error) => {
      console.error(error)
    })
  }

  handleFavourite = () => {
    this.setState({
      favourite: !this.state.favourite
    })
    this.handleFavouriteBool()
  }

  handleFavouriteBool = () => {
    console.log(this.state.favourite)
    const { locId } = this.props.route.params
    this.state.favourite ? this.unFavouriteLocation(locId) : this.favouriteLocation(locId)
  }

  deleteReview = async (locId, revId) => {
    console.log(revId)
    const token = await AsyncStorage.getItem('@session_token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locId + '/review' + '/' + revId,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-Authorization':token }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('OK')
      }else if (response.status === 400){
        console.log('Bad request')
      } else if (response.status === 401){
        console.log('Unauthorised')
      } else if (response.status === 403){
        console.log('Forbidden')
        Alert.alert('You can only delete your own review!')
      } else if (response.status === 404){
        console.log('Not Found')
      } else {
        console.log('Something went wrong')
      }
    })
    .then(async (responseJson) => {
      console.log('Deleted a review successfully')
      await AsyncStorage.getItem('@session_token')
      this.props.navigation.navigate('Home screen')

    })
    .catch((error) => {
      console.error(error)
    })
  }

  likeReview = async (locId, revId) => {
    const token = await AsyncStorage.getItem('@session_token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locId + '/review' + '/' + revId + '/like',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Authorization':token }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('OK')
      } else if (response.status === 400) {
        console.log('Bad request')
      } else if (response.status === 401){
        console.log('Unauthorised')
      }
      else if (response.status === 404){
        console.log('Not Found')
      } else {
        console.log('Something went wrong')
      }
    })
    .then(async (responseJson) => {
      console.log('Liked a review successfully')
      await AsyncStorage.getItem('@session_token')
      this.props.navigation.navigate('Home screen')
    })
    .catch((error) => {
      console.error(error)
    })
  }

  deletelike = async (locId, revId) => {
    console.log(revId)
    const token = await AsyncStorage.getItem('@session_token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locId + '/review' + '/' + revId + '/like',
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'X-Authorization':token }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('OK')
      } else if (response.status === 401){
        console.log('Unauthorised')
      } else if (response.status === 403){
        console.log('Forbidden')
        Alert.alert('You can only delete your own like!')
      } else if (response.status === 404){
        console.log('Not Found')
      } else {
        console.log('Something went wrong')
      }
    })
    .then(async (responseJson) => {
      console.log('Deleted a review successfully')
      await AsyncStorage.getItem('@session_token')
      this.props.navigation.navigate('Home screen')

    })
    .catch((error) => {
      console.error(error)
    })
  }

   deletePhoto = async (locId, revId) => {
    const token = await AsyncStorage.getItem('@session_token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locId + '/review' + '/' + revId + '/photo',
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'image/jpeg', 'X-Authorization':token }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('OK')
        this.setState({
          photoDeleted:true
        })
      } else if (response.status === 401){
        console.log('Unauthorised')
      } else if (response.status === 403){
        console.log('Forbidden')
        Alert.alert('You can only delete your own review!')
      } else if (response.status === 404){
        console.log('Not Found')
      } else {
        console.log('Something went wrong')
      }
    })
    .then(async (responseJson) => {
      console.log('Deleted a Photo successfully')
      await AsyncStorage.getItem('@session_token')
      //this.props.navigation.navigate('Home screen')
      this.showImage()

    })
    .catch((error) => {
      console.error(error)
    })
  }

  showImage = () =>{
    console.log(this.state.photoDeleted)
    return(
      <View>
        <Image source = {require('./images/blankImage.jpg')} style={{width:50, height:50}}/>
      </View>
      )
    
  }


  componentDidMount () {
    const { locId } = this.props.route.params
    this.getSpecificLocation(locId)
  }

  render () {
    const { locId } = this.props.route.params
    const navigation = this.props.navigation
    const heartColor = this.state.favourite ? 'red' : 'grey'
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text>Average clenliness rating : {this.state.avgClenlinessRating}</Text>
          <Text>Average overall rating : {this.state.avgOverallRating}</Text>
          <Text>Average price rating : {this.state.avgPriceRating}</Text>
          <Text>Average qualtity rating : {this.state.avgQualityRating}</Text>
          <Text>Location name : {this.state.locationName}</Text>
          <Text>Location town : {this.state.locationTown}</Text>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Review screen',{locId:locId})}>
              <Text>Add Review</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.handleFavourite()}>
            <Heart color={heartColor}/>
          </TouchableOpacity>
          <FlatList
            data={this.state.locationReviews}
            renderItem={({ item }) => (
              <View>
                <Text>Review</Text>
                <TouchableOpacity onPress={() => this.likeReview(locId,item.review_id)}>
                  <Text>likes: {item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deletelike(locId,item.review_id)}>
                  <Text>remove like</Text>
                </TouchableOpacity>   
                <Text>Overall rating: {item.overall_rating}</Text>
                <Text>Price rating: {item.price_rating}</Text>
                <Text>Quality rating: {item.quality_rating}</Text>
                <Text>Clenliness: {item.clenliness_rating}</Text>
                <Text>Review: {item.review_body}</Text>  
                <TouchableOpacity onPress={() => this.deleteReview(locId,item.review_id)}>
                  <Text>Delete Review</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Update Review screen',{locId:locId, revId: item.review_id.toString(),
                 overRatingParam: item.overall_rating, priceRatingParam: item.price_rating, qualityRatingParam: item.quality_rating,
                 clenlinessRatingParam: item.clenliness_rating, reviewBodyParam: item.review_body }) }>
                  <Text>Update Review</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=> navigation.navigate('Photo screen',{locId:locId,revId:item.review_id.toString()})}>
                  <Text>Add photo</Text>
                </TouchableOpacity>

                <Image source = {{
                  uri:'http://10.0.2.2:3333/api/1.0.0/location/' + locId + '/review/' + item.review_id.toString() + '/photo'}}
                  style = {{ width: 50, height: 50 }}/>

                <TouchableOpacity onPress={()=> this.deletePhoto(locId, item.review_id.toString())}>
                  <Text>Delete photo</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={({ review_id }, index) => review_id.toString()}
          />
        </View>
      )
    }
  }
}

export default LocationInfoScreen