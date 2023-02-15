import React, { Component, useState } from 'react';
import {View, TextInput, Text, StyleSheet, Modal, StatusBar, Button, TouchableOpacity} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation } from '@react-navigation/native';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 
}


changeScreenOrientation()


const Choicepage = ({navigation}) =>{
    return(
      
        <View style={styles.container}>
           
           <View style={{alignItems: 'flex-end'}}>
           <TouchableOpacity onPress={()=>{navigation.replace('Login')}} style={styles.sair}>
              <Text>Sair</Text>
            </TouchableOpacity>
           </View>
            <View style={styles.viewchoice}>
            <StatusBar hidden={true}/>
            <TouchableOpacity onPress={()=>{navigation.navigate('Mainpagechannels')}} style={styles.botaoarea}>
              <Text>Canais</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Mainpagemovie')}} style={styles.botaoarea}>
              <Text>Filmes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Mainpageseries')}} style={styles.botaoarea}>
              <Text>Series</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#000',
    display: 'flex'
  },
  viewchoice:{
    alignItems: 'center',
    justifyContent: 'center',
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
  sair:{
    width: 100,
    height: 40,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 20,
    marginBottom: 30,
  },
});
export default Choicepage
