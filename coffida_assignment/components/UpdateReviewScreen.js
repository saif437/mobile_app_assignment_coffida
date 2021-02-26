import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert} from 'react-native'
import { profanityFilter } from './helperFunctions'
import AsyncStorage from '@react-native-async-storage/async-storage'
/* 
screen for updating reviews 
user is prompt to enter details by filling in the text inputs
the information is then stored in state to sent to a patch request where the review is updated in the api
*/
class UpdateReviewScreen extends Component {
  constructor (props) {
    super(props)
    const { overallRatingParam, priceRatingParam, qualityRatingParam, clenlinessRatingParam, reviewBodyParam } = this.props.route.params
    this.state = {

      origOverallRating: overallRatingParam,
      origPriceRating: priceRatingParam,
      origQualityRating: qualityRatingParam,
      origClenlinessRating: clenlinessRatingParam,
      origReviewBody: reviewBodyParam

    }
  }
  /*
  sends a patch reques to update a user's review.
  Handles request for invalid and for updating someone else's review.
  Before the data is sent each state is check by their original state and compared to see if any changes are made,
  if changes are made, a empty list called userInfor gets the change state appended to it and sent as the body of the patch request. 
  */
  updateData = async (locId, revId) => {
    let userInfo = {}
    if(this.state.overallRating != this.state.origOverallRating){
      userInfo['overall_rating'] = parseInt(this.state.overallRating)
    }
    if(this.state.price_rating != this.state.origPriceRating){
      userInfo['price_rating'] = parseInt(this.state.priceRating)
    }
    if(this.state.qualityRating != this.state.origOverallRating){
      userInfo['quality_rating'] = parseInt(this.state.qualityRating)
    }
    if(this.state.clenlinessRating != this.state.origClenlinessRating){
      userInfo['clenliness_rating'] = parseInt(this.state.qualityRating)
    }
    if(this.state.reviewBody != this.state.origReviewBody){
      userInfo['review_body'] = profanityFilter(this.state.reviewBody)
    }
    console.log(userInfo)
    const token = await AsyncStorage.getItem('@session_token')
    Alert.alert('Refresh screen after updating review')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/'  + locId + '/review/' + revId,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-Authorization':token  },
      body: JSON.stringify(userInfo)
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('Ok')
        console.log(userInfo)
        //console.log(response.json())
        return response.json()
      } else if (response.status === 400) {
        console.log('Bad request')
        Alert.alert('All the forms need filling!')
      } else if (response.status === 401) {
        console.log('Unauthorised')
      } else if (response.status === 403) {
        console.log('Forbidden')
        Alert.alert('You can only update your own review')
      } else if (response.status === 404) {
        console.log('Not found')
      } else {
        console.log('Something went wrong')
      }
    })
    .then(async(responseJson) =>{
      console.log('Updated user details')
      await AsyncStorage.getItem('@session_token')
      console.log(responseJson)
      this.props.navigation.navigate('Location Info screen')

    })
    .catch((error) =>{
      console.log(error)
    })
  }

  /*
  Will display textInputs for the user to type the relevant information and has biuttons to complete requests
  */
  render () {
    const { locId, revId } = this.props.route.params
    const navigation = this.props.navigation
    return (
      <View style={styles.container}>
        <ScrollView>
          <TextInput style={styles.InputText}
            placeholder='Overall Rating: '
            onChangeText={(overallRating) => this.setState({ overallRating })}
            value={this.state.overallRating}
          />
          <TextInput style={styles.InputText}
            placeholder='Price Rating: '
            onChangeText={(priceRating) => this.setState({ priceRating })}
            value={this.state.priceRating}
          />
          <TextInput style={styles.InputText}
            placeholder='Qualtiy Rating: '
            onChangeText={(qualityRating) => this.setState({ qualityRating })}
            value={this.state.qualityRating}
          />
          <TextInput style={styles.InputText}
            placeholder='Clenliness Rating: '
            onChangeText={(clenlinessRating) => this.setState({ clenlinessRating })}
            value={this.state.clenlinessRating}
          />
          <TextInput style={styles.InputText}
            placeholder='Review Body: '
            onChangeText={(reviewBody) => this.setState({ reviewBody })}
            value={this.state.reviewBody}
          />
          <TouchableOpacity style={styles.button} onPress={()=> this.updateData(locId, revId)}>
            <Text style={styles.boldText}>Update review</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: '#272727',
    justifyContent: 'space-between'

  },
  InputText:{
    backgroundColor: '#747474',
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 5,
    borderColor: "#14a76c",
    borderRadius: 6,
    marginBottom: 10,
    marginTop: 10
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
export default UpdateReviewScreen
