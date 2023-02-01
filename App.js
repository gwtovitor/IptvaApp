import React, { Component, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/login';
import HomepageChannels from './Screens/homepagechannels';
import Videoplayer from './Screens/videoplayer';
import Filme from './Screens/homepagechannels';
import Canais from './Screens/canais';
import Homepage from './Screens/homepage';



async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 
}
changeScreenOrientation()

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }} >
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="HomepageChannels" component={HomepageChannels}/>
      <Stack.Screen name="Videoplayer" component={Videoplayer}/>
      <Stack.Screen name="Menu" component={Filme}/>
      <Stack.Screen name="Canais" component={Canais}/>
      <Stack.Screen name="Homepage" component={Homepage}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

