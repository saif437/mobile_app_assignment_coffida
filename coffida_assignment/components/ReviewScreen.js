import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, AsyncStorage } from 'react-native'
class ReviewScreen extends Component {
  constructor (props) {
    super(props)
    const { overallRatingParam, priceRatingParam, qualityRatingParam, clenlinessRatingParam, reviewBodyParam } = this.props.route.params
    this.state = {
      overallRating: '',
      priceRating: '',
      qualityRating: '',
      clenlinessRating: '',
      reviewBody: '',

    }
  }

  addReview = async (locId) => {
    const token = await AsyncStorage.getItem('@session_token')
    
    return fetch('http://10.0.2.2:3333/api/1.0.0/Location/'  + locId + '/review',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Authorization' : token },
        body:JSON.stringify({
          overall_rating: parseInt(this.state.overallRating),
          price_rating: parseInt(this.state.priceRating),
          quality_rating: parseInt(this.state.qualityRating),
          clenliness_rating: parseInt(this.state.clenlinessRating),
          review_body: this.state.reviewBody
        })
      })
      .then((response) => {
        if (response.status === 201) {
          console.log('created')
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
        console.log('review sumbited')
        await AsyncStorage.getItem('@session_token')
        this.props.navigation.navigate('Home screen')
      })
      .catch((error) => {
        console.error(error)
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
          <TouchableOpacity onPress={()=> this.addReview(locId)}>
            <Text>Add review</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default ReviewScreen
