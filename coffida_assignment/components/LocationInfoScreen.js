import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, AsyncStorage, ScrollView, Image, Alert, StyleSheet } from 'react-native'
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
        <View style={styles.container}>
          <Text style={styles.text}>Loading</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
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
                  onPress={() => this.deletelike(locId,item.review_id)}>
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
                <Image 
                source = {{uri:'http://10.0.2.2:3333/api/1.0.0/location/' + locId + '/review/' + item.review_id.toString() + '/photo'}} 
                style = {styles.image}/>
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
    paddingVertical: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
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
    width: 100,
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