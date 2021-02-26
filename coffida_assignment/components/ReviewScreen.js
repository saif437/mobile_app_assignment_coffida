import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, StyleSheet} from 'react-native'
import { profanityFilter } from './helperFunctions'
import AsyncStorage from '@react-native-async-storage/async-storage'
/*
screen for adding reviews 
user is prompt to enter details by filling in the text inputs
the information is then stored in state to sent to a post request where the review is added to the api 
post rquest to add review
text in the Textinput is being stored in state 
*/
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
          review_body: profanityFilter(this.state.reviewBody)
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
          <TouchableOpacity style={styles.button} onPress={()=> this.addReview(locId)}>
            <Text style={styles.boldText}>Add review</Text>
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

export default ReviewScreen
