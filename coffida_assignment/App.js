import 'react-native-gesture-handler'

import React, { Component } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
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

/*
implementing and stack and tab navigators
Tab navigator only visible in Home Screen
added some styling to the navigator
*/
class CoffidaApp extends Component {
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
            name='Home screen'
            component={TabNav}
            options={{
              title: 'Home',
              headerLeft: null
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

/*
Tab navigator
Added some styling to the tab navigator
*/
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

export default CoffidaApp
