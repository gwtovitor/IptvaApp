import React, { Component} from 'react';
import {View, StyleSheet, StatusBar, TouchableHighlight, Text, Image} from 'react-native';
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
      
        canais: [],
        canaisglobo: [],
        canaisbbb: [],
       };
       this.navigation = this.props.navigation;
       
  }
async componentDidMount(){
  const reponse = await api.get('/channel')
  this.setState({
    canais: reponse.data,
    canaisglobo: reponse.data[0].resultList,
    canaisbbb: reponse.data[1].resultList,
  })
  this.navigation = this.props.navigation;
}

  render(){

    return (
      
      <View style={{flex: 1}}>
        <StatusBar hidden={true}/>

      
        <FlashList
          data={this.state.canais}
          key={item => item.id}
          estimatedItemSize={10000}
          numColumns={4}
          renderItem={({item, index, separators})=> 
          <TouchableHighlight
          underlayColor={'#000'}
          activeOpacity={0.6}
          onPress={() => this.navigation.navigate('Canais', {paramKey: this.state.canais[index].resultList})}>
          <View style={styles.quadrado}>
            <Text style={styles.texto}>{item.category}</Text>
            <Image style={styles.imagem} source={{uri: item.logo}}></Image>

          </View>
        </TouchableHighlight>}/>
      </View>
  
    );}}
    
export default Homepage

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