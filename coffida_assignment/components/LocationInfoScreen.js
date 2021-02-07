import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
class LocationInfoScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      locationData: [],
      locationReviews: []
    }
  }

  getSpecificLocation (locId) {
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locId,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      .then((repsonse) => repsonse.json())
      .then((repsonseJson) => {
        console.log('Locations Found', repsonseJson)
        this.setState({
          isLoading: false,
          locationData: repsonseJson,
          avgClenlinessRating: repsonseJson.avg_clenliness_rating,
          avgOverallRating: repsonseJson.avg_overall_rating,
          avgPriceRating: repsonseJson.avg_price_rating,
          avgQualityRating: repsonseJson.avg_quality_rating,
          locationName: repsonseJson.location_name,
          locationReviews: repsonseJson.location_reviews,
          locationTown: repsonseJson.location_town,
          photoPath: repsonseJson.photo_path

        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidMount () {
    const { locId } = this.props.route.params
    this.getSpecificLocation(locId)
  }

  render () {
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
          <Text>Photo : {this.state.photoPath}</Text>
          <FlatList
            data={this.state.locationReviews}
            renderItem={({ item }) => (
              <View>
                <View>
                  <Text>Reviews</Text>
                  <Text>Clenliness: {item.clenliness_rating}</Text>
                  <Text>likes: {item.likes}</Text>
                  <Text>Overall rating: {item.overall_rating}</Text>
                  <Text>Price rating: {item.price_rating}</Text>
                  <Text>Quality rating: {item.quality_rating}</Text>
                  <Text>Review: {item.review_body}</Text>
                </View>
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
