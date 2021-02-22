import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, AsyncStorage } from 'react-native'
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

  updateData = async (locId, revId) =>{
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
      userInfo['review_body'] = this.state.reviewBody
    }
    console.log(userInfo)
    const token = await AsyncStorage.getItem('@session_token')

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
        this.props.navigation.navigate('Home screen')
        return response.json()
      } else if (response.status === 400) {
        console.log('Bad request')
      } else if (response.status === 401) {
        console.log('Unauthorised')
      } else if (response.status === 403) {
        console.log('Forbidden')
      } else if (response.status === 404) {
        console.log('Not found')
      } else {
        console.log('Something went wrong')
      }
    })
    /*.then(async(responseJson) =>{
      console.log('Updated user details')
      await AsyncStorage.getItem('@session_token')
      console.log(responseJson)
      this.props.navigation.navigate('User Info Screen')
    })*/
    .catch((error) =>{
      console.log(error)
    })
  }

  render () {
    const { locId, revId } = this.props.route.params
    const navigation = this.props.navigation
    return (
      <View>
        <ScrollView>
          <TextInput
            placeholder='Overall Rating: '
            onChangeText={(overallRating) => this.setState({ overallRating })}
            value={this.state.overallRating}
          />
          <TextInput
            placeholder='Price Rating: '
            onChangeText={(priceRating) => this.setState({ priceRating })}
            value={this.state.priceRating}
          />
          <TextInput
            placeholder='Qualtiy Rating: '
            onChangeText={(qualityRating) => this.setState({ qualityRating })}
            value={this.state.qualityRating}
          />
          <TextInput
            placeholder='Clenliness Rating: '
            onChangeText={(clenlinessRating) => this.setState({ clenlinessRating })}
            value={this.state.clenlinessRating}
          />
          <TextInput
            placeholder='Review Body: '
            onChangeText={(reviewBody) => this.setState({ reviewBody })}
            value={this.state.reviewBody}
          />
          <TouchableOpacity onPress={()=> this.updateData(locId, revId)}>
            <Text>Update review</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default UpdateReviewScreen
