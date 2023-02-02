import React, { Component, useState} from 'react';
import {View, StyleSheet, StatusBar, TextInput, Text, TouchableOpacity} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import api from '../src/services/getapi';
import { FlashList } from "@shopify/flash-list";



async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 
}
changeScreenOrientation()


class PageChannels extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      
        canais: [],
        canaisglobo: [],
        canaisbbb: [],
        searchbar: ''
       };
       this.navigation = this.props.navigation;
       this.search = this.search.bind(this)  
  }
async componentDidMount(){
  const reponse = await api.get('/channel')
  this.setState({
    canais: reponse.data,
    canaisglobo: reponse.data[0].resultList,
    canaisbbb: reponse.data[1].resultList,
  })
}
search(){
  if(this.state.searchbar === ''){
    return this.state.canais
  }else{
    
  }

}

  render(){

    return (
      
      <View style={{flex: 1, backgroundColor:'#000'}}>
        <View style={styles.textcontainer}>
          <TextInput style={styles.input} placeholderTextColor="#000" onChangeText={(t)=> this.setState({searchbar : t})}  placeholder="Pesquisa"></TextInput>
          <Text style={{color:'#fff', fontSize: 20,}}>{this.state.searchbar}</Text>
        </View>  
        <StatusBar hidden={true}/>

      
        <FlashList 
          data={this.search()}
          key={item => item.id}
          estimatedItemSize={10000}
          numColumns={4}
          backgroundColor='black'
          padding={1}
          renderItem={({item, index, separators})=> 

          <View style={styles.container}>
           
            <TouchableOpacity 
            style={styles.botao}
            onPress={() => this.navigation.navigate('Canais', {paramKey: this.state.canais[index].resultList})}>
              <View style={styles.quadrado}>
                <Text style={styles.texto}>{item.category}</Text>
              </View>
            </TouchableOpacity>
          </View>}
          />
          
     
      </View>
  
    );}}
    
export default PageChannels

const styles = StyleSheet.create({
  container:{ 
      backgroundColor: "#000",
      },
  input:{
      backgroundColor: '#fff',
      height: 50,
      width: 400,
      borderRadius:10,
      textAlign: 'center',
      fontSize: 18,
    },
    textcontainer:{
      marginTop: 20,
      alignItems: 'center',
      justifyContent:'center'
    },
  quadrado:{
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
  texto:{
      color: "#000"     
  },
});