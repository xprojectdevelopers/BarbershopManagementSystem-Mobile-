import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

//Screens
import LoginScreen from '../Screens/Auth/LoginScreen'
import HomeScreen from '../Screens/Home/HomeScreen'
import ResigsterScreen from '../Screens/Auth/ResigsterScreen'

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={() => ({ headerShown: false })} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={ResigsterScreen} />
    </Stack.Navigator>
  )
}