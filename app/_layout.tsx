import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from './screens/Layout';
import MovieOrShowDetail from './screens/MovieOrShowDetail';
import Profile from './screens/Profile';


const Stack = createNativeStackNavigator();

export default function _layout() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={{headerShown:false}} name="Home" component={Layout} />
      <Stack.Screen options={({ route }:any) => ({ title: route?.params?.name })} name="MovieOrShowDetail" component={MovieOrShowDetail} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}