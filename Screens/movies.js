import React, { Component} from 'react';
import {View, StyleSheet, StatusBar, TouchableHighlight, Text, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { FlashList } from "@shopify/flash-list";


async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 
}
changeScreenOrientation()


const Movies = ({route, navigation}) =>{
  function organizando(canaisname){
    return canaisname.sort(function(a,b){
      if(a.dataName > b.dataName){
        return true
      }else{
        return false
      }
    })
  }  
  return (
      
      <View style={{flex: 1}}>
        <StatusBar hidden={true}/>

      
        <FlashList
          data={organizando(route.params.paramKey)}
          key={item => item.id}
          estimatedItemSize={10000}
          numColumns={4}
          renderItem={({item})=> 
          <TouchableHighlight
          underlayColor={'#000'}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('Videoplayer', {paramKey: item.link})}>
          <View style={styles.quadrado}>
            <Text style={styles.texto}>{item.dataName}</Text>
            <Image style={styles.imagem} source={{uri: item.logo}}></Image>

          </View>
        </TouchableHighlight>}/>
      </View>
  
    );}
    
export default Movies

const styles = StyleSheet.create({
  container:{ 
      flex: 1,
      backgroundColor: "#000",
      display: 'flex'
   
      },
  quadrado:{
      width: 200,
      height: 200,
      borderColor: '#fff',
      borderRadius: 10,
      borderWidth: 2,
      alignItems: 'center'   
  },
  imagem:{
      width: 100,
      height: 100,
      
    },
  texto:{
      color: "#fff",
      backgroundColor: '#23f',
      marginTop: 30,       
      
  },
});