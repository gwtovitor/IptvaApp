import React, { Component, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/login';
import PageChannels from './Screens/pagechannels';
import Videoplayer from './Screens/videoplayer';
import Canais from './Screens/canais';
import Homepage from './Screens/homepage';
import PageMovies from './Screens/pagemovies';
import Movies from './Screens/movies';
import PageSeries from './Screens/pageseries';
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
      <Stack.Screen name="PageChannels" component={PageChannels}/>
      <Stack.Screen name="Videoplayer" component={Videoplayer}/>
      <Stack.Screen name="Canais" component={Canais}/>
      <Stack.Screen name="Homepage" component={Homepage}/>
      <Stack.Screen name="PageMovies" component={PageMovies}/>
      <Stack.Screen name="Filmes" component={Movies}/>
      <Stack.Screen name="PageSeries" component={PageSeries}/>
      <Stack.Screen name="Series" component={Series}/>
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

