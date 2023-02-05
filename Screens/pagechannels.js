import React, { Component, useState} from 'react';
import {View, StyleSheet, StatusBar, TextInput, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
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
        searchbar: '',
        erromsg: ''
       };
       this.navigation = this.props.navigation;
       this.search = this.search.bind(this)  
       this.carregando = this.carregando.bind(this)
  
  }
  
carregando(){
  while(this.state.canais == ''){
    return (<View>
                <ActivityIndicator color="#009688" 
              size="large" 
              ></ActivityIndicator>
              <Text style={{color:'red', fontSize: 20,}}>{this.state.erromsg}</Text>
            </View>
            )
  }
}

async componentDidMount(){
  const response = await api.get('/channel').catch((error)=>{
    if(error.response){
      this.setState({erromsg: 'Erro ao se conectar com servidor, favor reportar ao administrador'})
    }
    else if(error.request){
      this.setState({erromsg: 'Erro ao se conectar com servidor, favor reportar ao administrador'})
    }
    else{
      this.setState({erromsg: 'Erro ao se conectar com servidor, favor reportar ao administrador'})
    }
  })
  this.setState({
    canais: response.data,   
  })
}


search(){
  if(this.state.searchbar === ''){
    return this.state.canais.sort(function(a,b){
      if(a.category > b.category){
        return true
      }else{
        return false
      }
    })
  }else{
     const filtrado = this.state.canais.filter((channels)=>{
      return channels.category.toLowerCase().indexOf(this.state.searchbar.toLowerCase()) !== -1
     })
     return filtrado
  }
}


  render(){
    this.carregando()
    return (
      
      <View style={{flex: 1, backgroundColor:'#000'}}>
        <View style={styles.textcontainer}>
          <TextInput style={styles.input} placeholderTextColor="#000" 
          onChangeText={(text)=> this.setState({searchbar : text})}  placeholder="Pesquisa"></TextInput>
          <Text style={{color:'red', fontSize: 20,}}>{this.carregando()}</Text>     
          
        </View>  
        <StatusBar hidden={true}/>
    
        <FlashList 
          data={this.search()}
          key={item => item.id}
          estimatedItemSize={10000}
          numColumns={4}
          backgroundColor='black'
          padding={1}
          renderItem={({item, index})=> 
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
      marginBottom: 10,
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