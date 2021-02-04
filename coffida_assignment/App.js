import 'react-native-gesture-handler'

import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import LoginScreen from './components/LoginScreen'
import CreateAccountScreen from './components/CreateAccountScreen'
import HomeScreen from './components/HomeScreen'
import ReviewScreen from './components/ReviewScreen'
import UserInfoScreen from './components/UserInfoScreen'
import AddLocationScreen from './components/AddLocationScreen'
import LogoutScreen from './components/LogoutScreen'

class CoffidaApp extends Component {
  render () {
    const Stack = createStackNavigator()
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login screen' component={LoginScreen} />
          <Stack.Screen name='Create account screen' component={CreateAccountScreen} />
          <Stack.Screen name='Home screen' component={DrawerNav} />
          <Stack.Screen name='Review screen' component={ReviewScreen} />
          <Stack.Screen name='User Info Screen' component={UserInfoScreen} />
          <Stack.Screen name='Add location screen' component={AddLocationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const Drawer = createDrawerNavigator()

function DrawerNav () {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home screen' component={HomeScreen} />
      <Drawer.Screen name='User Info Screen' component={UserInfoScreen} />
      <Drawer.Screen name='Log out' component={LogoutScreen} />
    </Drawer.Navigator>
  )
}
export default CoffidaApp