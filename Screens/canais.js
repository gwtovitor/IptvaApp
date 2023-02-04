import React, { Component} from 'react';
import {View, StyleSheet, StatusBar, Text, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { FlashList } from "@shopify/flash-list";
import { TouchableOpacity } from 'react-native-gesture-handler';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 
}
changeScreenOrientation()

const Canais = ({route, navigation}) =>{
    
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
  
    return (
      
      
      <View style={{flex: 1, backgroundColor:'#000',}}>
        <StatusBar hidden={true}/>

      
        <FlashList
          data={organizando(route.params.paramKey)}
          key={item => item.id}
          estimatedItemSize={10000}
          numColumns={4}
          renderItem={({item})=> 

            <TouchableOpacity
            style ={styles.botao}
            onPress={() => navigation.navigate('Videoplayer', {paramKey: item.link})}>
            <View style={styles.quadrado}>
              <Image style={styles.imagem} source={logo(item.logo)}></Image>
              <Text style={styles.texto}>{item.dataName}</Text>
            </View>
          </TouchableOpacity>}/>
      </View>
  
    );}
    
export default Canais

const styles = StyleSheet.create({
  container:{ 
      flex: 1,
      backgroundColor: "#000",
      justifyContent: 'center',
      alignItems: 'center',
   
      },
  botao:{
    marginTop: 10,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  quadrado:{
      width: 200,
      height: 200,
      borderRadius: 10,
      borderWidth: 3,
      alignItems: 'center',
      backgroundColor: '#000',
      justifyContent: 'center',
      borderColor:'#fff',
  },
  imagem:{
      width: 100,
      height: 100,
      marginTop: 10,
      resizeMode: "contain",
    },
  texto:{
      color: "#fff",
      backgroundColor: '#23f',
      marginTop: 30,       
      
  },
});