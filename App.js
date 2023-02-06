import React, { Component, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/login';
import Choicepage from './Screens/Choicepage';
import Videoplayer from './Screens/videoplayer';
import Mainpagechannels from './Screens/Mainpagechannels';
import Mainpagemovie from './Screens/Mainpagemovies';
import Mainpageseries from './Screens/Mainpageseries';
import Series from './Screens/series';


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
      <Stack.Screen name="Choicepage" component={Choicepage}/>
      <Stack.Screen name="Mainpagechannels" component={Mainpagechannels}/>
      <Stack.Screen name="Mainpagemovie" component={Mainpagemovie}/>
      <Stack.Screen name="Mainpageseries" component={Mainpageseries}/>
      <Stack.Screen name="Series" component={Series}/>
      <Stack.Screen name="Videoplayer" component={Videoplayer}/>
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

