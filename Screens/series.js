import React, { Component} from 'react';
import {View, StyleSheet, StatusBar, TouchableHighlight, Text, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { FlashList } from "@shopify/flash-list";


async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 
}
changeScreenOrientation()


const Series = ({route, navigation}) =>{
  
  function organizando(canaisname){
    return canaisname.sort(function(a,b){
      if(a.dataName > b.dataName){
        return true
      }else{
        return false
      }
    })
  } 

  function logo(ulrlogo){
    if(ulrlogo == ''){
      return require('../src/logo.jpg')
    } 
      else{
        return {uri: ulrlogo}
      }
  }


function attlista(lista, cont){
  
  var lista2 = lista[cont]
  return lista2

}

  return (
      
      <View style={{flex: 1, backgroundColor: "#000", flexDirection: 'row'}}>
         <Text style={{color:"#fff"}}>{route.params.paramKey}</Text>
         <Text style={{color:'#fff'}}>{route.params.paramKan}</Text>
      </View>
  
    );}
    
export default Series

const styles = StyleSheet.create({
  container:{ 
      flex: 1,
      backgroundColor: "#000",
      display: 'flex'
   
      },
  botaoleft:{
    width: 200,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',   
    justifyContent: 'center',
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderColor: '#fff',
    margin: 3, 
  },
  imagem:{
      width: 100,
      height: 100,
      
    },
  texto:{
      color: "#000"      
  },

  leftview:{
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
  },

  rigthview:{
    backgroundColor: '#000',
    flex: 3,
    marginBottom: 10,
    marginTop: 10,
},
});