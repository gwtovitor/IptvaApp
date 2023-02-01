import React, { Component, useState } from 'react';
import {View, TextInput, Text, StyleSheet, Modal, StatusBar, Button, TouchableOpacity} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation } from '@react-navigation/native';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 
}


changeScreenOrientation()


const Homepage = ({route, navigate, navigation}) =>{
    return(
      
        <View style={styles.container}>
            
            <StatusBar hidden={true}/>
            <TouchableOpacity onPress={()=>{navigation.navigate('HomepageChannels')}} style={styles.botaoarea}>
              <Text style={styles.botaoentrar}>Canais</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Homepage')}} style={styles.botaoarea}>
              <Text style={styles.botaoentrar}>Filmes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Homepage')}} style={styles.botaoarea}>
              <Text style={styles.botaoentrar}>Series</Text>
            </TouchableOpacity>

        </View>
    );
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    display: 'flex'
  },

  inputs:{
    borderColor: 'black',
    width: 300,
    height: 40, 
    margin: 5,
    borderWidth: 2,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: 10,
  },
  textologin:{
    fontSize: 20,
    color: 'red',
    fontSize: 30,
    paddingBottom: 20,
    fontWeight: 'bold',

  },
 
  botaoarea:{
    width: 200,
    height: 40,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 15,
  },
});
export default Homepage
