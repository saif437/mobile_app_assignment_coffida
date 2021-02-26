import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, ScrollView, Image, Alert, StyleSheet } from 'react-native'
import { Heart } from 'react-native-shapes'
import AsyncStorage from '@react-native-async-storage/async-storage'
/* 
Majority of the app's functionality is implement here and paves ways for other functionality:
.Get Location Info
.Favourite a location
.Unfavourite a location
.Add reviews
.Update reviews
.Delete reviews
.Add photos
.Delete photos
.Like reviews
.Unlike reviews
*/
class LocationInfoScreen extends Component {
  /*
  LocationReviews is list which will stores reviews
  imageUri is where the uri path is stored and will update to the correct path when a photo is addded
  */
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      locationData: [],
      locationReviews: [],
      favourite: false,
      imageUri: 'https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg'
    }
  }

  /*
  Get request to access location details and the information retrieved is stored in state in the relevant names.
  */
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

  /*
  Post request to favourite a location
  */
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

  /*
  Delete request to unfavourite a location
  */
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

  /*
  This function will set the favourite state to the opposite boolean value,
  then call handleFavouriteBool().
  */
  handleFavourite = () => {
    this.setState({
      favourite: !this.state.favourite
    })
    this.handleFavouriteBool()
  }

  /*
  This function will determin whether the user wants to favourite or unfavourite a location,
  and sends called the function to complete the api request.
  */
  handleFavouriteBool = () => {
    console.log(this.state.favourite)
    const { locId } = this.props.route.params
    this.state.favourite ? this.unFavouriteLocation(locId) : this.favouriteLocation(locId)
  }

  /*
  Will send a delete request to remove a user's own review and will handle any invalid requests,
  such as deleting someone else's review.
  */
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
      this.getSpecificLocation(locId)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  /*
  Will send a post request to like a review
  */
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
      this.getSpecificLocation(locId)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  /*
  Will send a delete request to remove a like and will handle any request to remove likes which are not theirs.
  */
  deletelike = async (locId, revId, likes) => {
    const token = await AsyncStorage.getItem('@session_token')
    if( likes===0){
      console.log('remove like is invalid')
    }
    else{
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
        console.log('Deleted like request done')
        await AsyncStorage.getItem('@session_token')
        this.getSpecificLocation(locId)
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }

  /*
  Will send a delete request to remove a photo and will handle any attempts to delete someone else's photo and non existent photos.
  Once Image is delete the URI is change in state to the original path
  */
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
      } else if (response.status === 401){
        console.log('Unauthorised')
      } else if (response.status === 403){
        console.log('Forbidden')
        Alert.alert('You can only delete your someone elses photo!')
      } else if (response.status === 404){
        console.log('Not Found')
      } else {
        console.log('Something went wrong')
      }
    })
    .then(async (responseJson) => {
      console.log('Deleted a Photo successfully')
      await AsyncStorage.getItem('@session_token')
      this.setState({
        imageUri: 'https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg'
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }

  /*
  Will send a get request to a get a photo for a review 
  and will handle any photos being added to someone else's review
  Will also set the right uri path to state to display the correct image
  */
  getPhoto = async (locId, revId) => {

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locId + '/review' + '/' + revId + '/photo',
    {
      method: 'get',
      headers: { 'Content-Type': 'image/jpeg' }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('OK')
        this.setState({
          imageUri: 'http://10.0.2.2:3333/api/1.0.0/location/' + locId + '/review/' + revId + '/photo'
        })
      } else if (response.status === 404){
        console.log('Not Found')
      } else {
        console.log('Something went wrong')
      }
    })
    .catch((error) => {
      console.error(error)
    })
  }

  /*
  Will called getSpecificLocation to access location information and reviews,
  once this screen is navigated to.
  */
  componentDidMount () {
    const { locId } = this.props.route.params
    this.getSpecificLocation(locId)
  }

  /*
  render function displays the information and 
  uses a flatlist to display reviews and add review fucntionality. 
  */
  render () {
    const { locId } = this.props.route.params
    const navigation = this.props.navigation
    {/*Wil change the color of the heart depending on the state of favourite*/}
    const heartColor = this.state.favourite ? 'red' : 'grey'
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Loading</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={()=>this.getSpecificLocation(locId)}>
            <Text style={styles.boldText}>Refresh</Text>
          </TouchableOpacity>
          <Text style={styles.boldText}>Average clenliness rating : {this.state.avgClenlinessRating}</Text>
          <Text style={styles.boldText}>Average overall rating : {this.state.avgOverallRating}</Text>
          <Text style={styles.boldText}>Average price rating : {this.state.avgPriceRating}</Text>
          <Text style={styles.boldText}>Average qualtity rating : {this.state.avgQualityRating}</Text>
          <Text style={styles.boldText}>Location name : {this.state.locationName}</Text>
          <Text style={styles.boldText}>Location town : {this.state.locationTown}</Text>
          
          <View style={styles.rowContainer}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Review screen',{locId:locId})}>
              <Text style={styles.boldText}>Add Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={() => this.handleFavourite()}>
              <Heart style={styles.heart} color={heartColor}/>
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.locationReviews}
            renderItem={({ item }) => (
              <ScrollView>
                <Text style={styles.boldText}>Review</Text>
                <View style={styles.rowContainer}>
                  <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.likeReview(locId,item.review_id)}>
                    <Text style={styles.boldText}>likes: {item.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.deletelike(locId,item.review_id,item.likes)}>
                    <Text style={styles.boldText}>remove like</Text>
                  </TouchableOpacity>   
                </View>

                <Text style={styles.text}>Overall rating: {item.overall_rating}</Text>
                <Text style={styles.text}>Price rating: {item.price_rating}</Text>
                <Text style={styles.text}>Quality rating: {item.quality_rating}</Text>
                <Text style={styles.text}>Clenliness: {item.clenliness_rating}</Text>
                <Text style={styles.text}>Review: {item.review_body}</Text>  
                
                <View style={styles.rowContainer}>
                  <TouchableOpacity 
                  style={styles.button}
                  onPress={() => this.deleteReview(locId,item.review_id)}>
                    <Text style={styles.boldText}>Delete Review</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  style={styles.button}
                  onPress={() => navigation.navigate('Update Review screen',{locId:locId, revId: item.review_id.toString(),
                   overRatingParam: item.overall_rating, priceRatingParam: item.price_rating, qualityRatingParam: item.quality_rating,
                   clenlinessRatingParam: item.clenliness_rating, reviewBodyParam: item.review_body }) }>
                    <Text style={styles.boldText}>Update Review</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.rowContainer}>
                  <TouchableOpacity
                  style={styles.button}
                  onPress={()=> navigation.navigate('Photo screen',{locId:locId,revId:item.review_id.toString()})}>
                    <Text style={styles.boldText}>Add photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  style={styles.button}
                  onPress={()=> this.deletePhoto(locId, item.review_id.toString())}>
                    <Text style={styles.boldText}>Delete photo</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>this.getPhoto(locId, item.review_id.toString())}>
                  <Text style={styles.boldText}>Get Photo</Text>
                  <Image source = {{uri:this.state.imageUri}} style = {styles.image}/>
                </TouchableOpacity>
              </ScrollView>
            )}
            keyExtractor={({ review_id }, index) => review_id.toString()}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: '#272727',
    justifyContent: 'flex-start',
  },
  rowContainer:{
    flexDirection: 'row',
  },
  button:{
    width:'25%',
    borderWidth: 5,
    borderColor: "#14a76c",
    borderRadius: 6,
    paddingVertical: 5,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5
  },
  text:{
    fontSize: 16,
    color: '#ff652f'
  },
  boldText:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff652f'
  },
  image:{
    width: 75,
    height: 50,
    borderColor: "#14a76c",
    borderRadius: 6,

  },
  heart:{
    borderColor: "#14a76c",
    borderRadius: 6,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 40,
    marginBottom: 40

  }
})
export default LocationInfoScreen