import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';


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
            resizeMode='contain'
            useNativeControls
            minLoadRetryCount={50}
            progressUpdateIntervalMillis={1000}
            shouldPlay
            isLooping={true}
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