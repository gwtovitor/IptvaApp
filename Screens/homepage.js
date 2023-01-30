import React, { Component, useEffect, useState } from 'react';
import {View, ActivityIndicator, StyleSheet, StatusBar, FlatList} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import api from '../src/services/getapi';
import Filme from '../src/Lista';


async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 
}
changeScreenOrientation()



class Homepage extends Component{
  
  constructor(props){
    super(props);
    this.state = {
          filmes: []
       };

  }
async componentDidMount(){
  const reponse = await api.get('/iptv')
  this.setState({
    filmes: reponse.data
  })
}


  render(){

    return (

      <View style={{flex: 1, padding: 24, backgroundColor: 'black'}}>
        <FlatList
        data={this.state.filmes}
        key={item => item.link}
        renderItem={({item})=> <Filme data={item}/>}></FlatList>
      </View>
    );}}
export default Homepage
