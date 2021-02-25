import React, { Component } from 'react'
import { Text, View, FlatList, AsyncStorage, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native'
/* 
screen showing user's details 
get request to get the user's details and results are set in state to be displayed in the render function 
*/
class UserInfoScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading : true,

    }
  }

  getData = async () =>{
    console.log('inside fuction')
    const token = await AsyncStorage.getItem('@session_token')
    const id = await AsyncStorage.getItem('@user_id')

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + id,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'X-Authorization':token  }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('Ok')
        return response.json()
      } else if (response.status === 401) {
        console.log('Unauthorised')
      } else {
        console.log('Something went wrong')
      }
    })
    .then(async(responseJson) =>{
      console.log('got user details')
      await AsyncStorage.getItem('@session_token')
      console.log(responseJson)
      this.setState({
        isLoading:false,
        email:responseJson.email,
        firstName:responseJson.first_name,
        lastName:responseJson.last_name,
        favouriteLocations:responseJson.favourite_locations,
        reviews:responseJson.review,
        likedReviews:responseJson.liked_reviews

      })
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  componentDidMount () {
    this.getData()
  }
  render(){
    const navigation = this.props.navigation
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Email : {this.state.email}</Text>
        <Text style={styles.text}>First name : {this.state.firstName}</Text>
        <Text style={styles.text}>Last name : {this.state.lastName}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Update User Info screen',{emailParam:this.state.email,
          firstNameParam:this.state.firstName, lastNameParam:this.state.lastName,})}>
          <Text style={styles.boldText}>Update Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Home screen')}>
          <Text style={styles.boldText}>Go back to Home screen</Text>
        </TouchableOpacity>
      </View>
      )
    }
  }

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: '#272727',

  },
  button:{
    borderWidth: 5,
    borderColor: "#14a76c",
    borderRadius: 6,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10
  },
  text:{
    fontSize: 16,
    textAlign: 'center',
    color: '#ff652f'
  },
  boldText:{
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ff652f'
  }
})
export default UserInfoScreen