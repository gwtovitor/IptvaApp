import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRoute } from '@react-navigation/native';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 }

changeScreenOrientation()


const Videoplayer = ({route}) =>{

          return(<View style={styles.container}>
               <StatusBar hidden={true}/>
            <Video
            source={{ uri: route.params.paramKey}}
            rate={1.0}
            onError={(error) => {
              alert('Não foi possivel conectar com o servidor, favor entrar em contato com o administrador')
              }} 
            volume={1.0}
            loadAsync
            shouldPlay
            resizeMode='contain'
            useNativeControls
            minLoadRetryCount={5}
            style={{ flex: 1,}}/>
                  
          </View>
      );
    }
export default Videoplayer
  
  const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000'
    },

  })  