import React, { Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import api from '../src/services/getapi';
import { FlashList } from "@shopify/flash-list";
import Filme from '.';

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
       this.navigation = this.props.navigation;
       
  }
async componentDidMount(){
  const reponse = await api.get('/iptv')
  this.setState({
    filmes: reponse.data
  })
}


  render(){

    return (
      
      <View style={{flex: 1}}>
        <StatusBar hidden={true}/>


        <FlashList
          data={this.state.filmes}
          key={item => item.id}
          estimatedItemSize={10000}
          numColumns={4}
          renderItem={({item})=> <Filme data={item}/>}/>
      </View>
  
    );}}
export default Homepage

const styles = StyleSheet.create({
  container:{ 
      flex: 1,
      backgroundColor: "#000",
      display: 'flex',
      zIndex: 9000,
   
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