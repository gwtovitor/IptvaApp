import React, { Component, useState} from 'react';
import {View, StyleSheet, StatusBar, TextInput, Text, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import api from '../src/services/getapi';
import { FlashList } from "@shopify/flash-list";



async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 
}
changeScreenOrientation()


class Mainpageseries extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      
        canais: [],
        searchbar: '',
        erromsg: '',
        canalselect: '',
        indice: '0',
        envioprops: ''
       };
       this.navigation = this.props.navigation;
       this.carregando = this.carregando.bind(this)
       this.organizando = this.organizando.bind(this)
       this.logo = this.logo.bind(this)
       this.envioserie = this.envioserie.bind(this)
  
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
     const response = await api.get('/serie').catch((error)=>{
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
          canalselect: response.data[this.state.indice].series
        })
 }
 
 search(){
    if(this.state.searchbar === ''){
      return this.state.canalselect
    }else{
       const filtrado = this.state.canalselect.filter((channels)=>{
        return channels.dataName.toLowerCase().indexOf(this.state.searchbar.toLowerCase()) !== -1
       })
       return filtrado
    }
  }

organizando(canaisname){
    return canaisname.sort(function(a,b){
      if(a.dataName > b.dataName){
        return true
      }else{
        return false
      }
    })
  }
  
logo(ulrlogo){
    if(ulrlogo == ''){
      return require('../src/logo.jpg')
    } 
      else{
        return {uri: ulrlogo}
      }
  }
async attcanal(index){
    const response = await api.get('/serie')
    this.setState({canalselect: response.data[index].series})
    
}

async envioserie(indice1, indice2){
  const response = await api.get('/serie')
  this.setState({envioprops: response.data[0].series[0].episodes})
  this.navigation.navigate('Series', this.state.envioprops)
}

  render(){
    return (
      
      <View style={styles.container}>
         <StatusBar hidden={true}/>
        
        <View style={styles.leftview}>
            <FlashList 
            data={this.state.canais}
            key={item => item.id}
            estimatedItemSize={10000}
            backgroundColor='black'
            renderItem={({item, index})=> 
            <View>
                                
                <TouchableOpacity 
                style={styles.botao}
                onPress={()=> {this.attcanal(index)}}>
                <View style={styles.botaolatesquerdo}>
                    <Text>{item.category}</Text>
                </View>
                </TouchableOpacity>
            </View>}
            />
            </View>
        <View style={styles.rigthview}>
          <View style={{alignItems: 'center'}}> 
          
          <TextInput style={styles.input} placeholderTextColor="#000" 
            onChangeText={(text)=> this.setState({searchbar : text})}  placeholder="Pesquisa"></TextInput>
            <Text>{this.carregando()}</Text>
          </View>
        <FlashList
          data={this.search()}
          key={item => item.id}
          estimatedItemSize={5000}
          numColumns={3}
          renderItem={({item, index})=> 

            <TouchableOpacity
            style ={styles.botaolatdireito}
            onPress={()=> this.envioserie(this.state.indice, index)}>
            <View style={styles.viewbotaodireito}>
                <Text style={styles.texto}>{item.name}</Text>
                <Image style={styles.imagem} source={this.logo(item.logo)}></Image>
             
            </View>
          </TouchableOpacity>}/>
        </View>
      </View>  
        
    
  
    );}}
    
export default Mainpageseries

const styles = StyleSheet.create({
  container:{ 
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000',
       
      },
    leftview:{
      backgroundColor: '#fff',
      flex: 1,
      marginBottom: 10,
      marginTop: 10,
    },
    botaolatesquerdo:{
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
    input:{
      backgroundColor: '#fff',
      height: 50,
      width: 400,
      borderRadius:10,
      textAlign: 'center',
    },
    rigthview:{
        backgroundColor: '#000',
        flex: 3,
        marginBottom: 10,
        marginTop: 10,
    },
    botaolatdireito:{
        width: 200,
        height: 150,
        borderRadius: 10,
        borderWidth: 3,
        justifyContent: 'center',
        backgroundColor: '#000',
        borderColor:'#fff',

        margin:3,
    },
 
  viewbotaodireito:{
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  imagem:{
    width: 70,
    height: 70,
    resizeMode: 'contain',

  },
  texto:{
    color:'#fff',
    fontSize: 15,
    marginLeft: 5,
    marginRight: 5,
  },
});