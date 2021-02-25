import 'react-native-gesture-handler'

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import LoginScreen from './components/LoginScreen'
import CreateAccountScreen from './components/CreateAccountScreen'
import HomeScreen from './components/HomeScreen'
import ReviewScreen from './components/ReviewScreen'
import UserInfoScreen from './components/UserInfoScreen'
import LocationInfoScreen from './components/LocationInfoScreen'
import LogoutScreen from './components/LogoutScreen'
import MapScreen from './components/MapScreen'
import PhotoScreen from './components/PhotoScreen'
import UpdateUserInfoScreen from './components/UpdateUserInfoScreen'
import UpdateReviewScreen from './components/UpdateReviewScreen'

import Icon from 'react-native-vector-icons/Ionicons'

class CoffidaApp extends Component {
  // Stack navigation for the main screens of the app
  // Drawer navigation is only accesed in the home screen
  render () {
    const Stack = createStackNavigator()
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#747474'
            },
            headerTitleStyle: {
              fontSize: 16,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#ff652f'
            }
          }}
        >
          <Stack.Screen
            name='Login screen'
            component={LoginScreen}
            options={{
              title: 'Login'
            }}
          />
          <Stack.Screen
            name='Create account screen'
            component={CreateAccountScreen}
            options={{
              title: 'Register'
            }}
          />
          <Stack.Screen
            name='Home screen'
            component={TabNav}
            options={{
              title: 'Home'
            }}
          />
          <Stack.Screen
            name='Review screen'
            component={ReviewScreen}
            options={{
              title: 'Review'
            }}
          />
          <Stack.Screen
            name='User Info Screen'
            component={UserInfoScreen}
            options={{
              title: 'User Details'
            }}
          />
          <Stack.Screen
            name='Location Info screen'
            component={LocationInfoScreen}
            options={{
              title: 'Locations'
            }}
          />
          <Stack.Screen
            name='Map screen'
            component={MapScreen}
            options={{
              title: 'Maps'
            }}
          />
          <Stack.Screen
            name='Photo screen'
            component={PhotoScreen}
            options={{
              title: 'Photo'
            }}
          />
          <Stack.Screen
            name='Update User Info screen'
            component={UpdateUserInfoScreen}
            options={{
              title: 'Update User Details'
            }}
          />
          <Stack.Screen
            name='Update Review screen'
            component={UpdateReviewScreen}
            options={{
              title: 'Update Review'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const Tab = createBottomTabNavigator()

function TabNav () {
  return (
    <Tab.Navigator
      tabBarOptions={{
      	activeTintColor: '#ff652f',
      	inactiveTintColor: '#ff652f',
      	tabStyle: {
      		backgroundColor: '#747474'
      	},
      	labelStyle: {
      		fontSize: 16,
		    textAlign: 'center',
		    fontWeight: 'bold',
		    color: '#ff652f'
      	}
      }}
    >
      <Tab.Screen
        name='Home screen' component={HomeScreen}
        options={{
          title: 'Home'
        }}
      />
      <Tab.Screen
        name='User Info Screen' component={UserInfoScreen}
        options={{
          title: 'UserDetails'
        }}
      />
      <Tab.Screen
        name='Log out' component={LogoutScreen} options={{
          title: 'Logout'
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey'
  }
})

export default CoffidaApp

const Drawer = createDrawerNavigator()
