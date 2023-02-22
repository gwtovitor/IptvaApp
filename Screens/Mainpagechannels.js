import React, { Component} from 'react';
import {View, StyleSheet, StatusBar, TextInput, Text, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import api from '../src/services/getapi';
import { FlashList } from "@shopify/flash-list";
import { Button} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';






async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 
}
changeScreenOrientation()


class Mainpagechannels extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      
        canais: [],
        searchbar: '',
        erromsg: '',
        canalselect: '',
        indice: '0',
        cordefundodireito: '#000',
        cordefundoesquerdo: '#fff000',
        flag : 0
       };
       this.navigation = this.props.navigation;
       this.carregando = this.carregando.bind(this)
       this.organizando = this.organizando.bind(this)
       this.logo = this.logo.bind(this)
      
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
  const value = await AsyncStorage.getItem('token')
  const response = await api.get('/channel', {headers:{
   'Authorization': `Bearer ${value}`
   }}).catch(function (error) {
   if(error.response){
     Alert.alert('Error', 'Usuario expirado, favor logar novamente',[{
       text: 'OK',
       onPress: ()=> {
         navigation.navigate('Login')}
     }])
   }
   else if(error.request){
     Alert.alert('Error', 'Usuario expirado, favor logar novamente',[{
       text: 'OK',
       onPress: ()=> {
         navigation.navigate('Login')}
     }])
   }
   else{
     Alert.alert('Error', 'Usuario expirado, favor logar novamente',[{
       text: 'OK',
       onPress: ()=> {
         navigation.navigate('Login')}
     }])
   } 
});
        this.setState({
          canais: response.data,
          canalselect: response.data[this.state.indice].resultList
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
  const value = await AsyncStorage.getItem('token')
  const response = await api.get('/channel', {headers:{
   'Authorization': `Bearer ${value}`
   }}).catch(function (error) {
   if(error.response){
     Alert.alert('Error', 'Usuario expirado, favor logar novamente',[{
       text: 'OK',
       onPress: ()=> {
         navigation.navigate('Login')}
     }])
   }
   else if(error.request){
     Alert.alert('Error', 'Usuario expirado, favor logar novamente',[{
       text: 'OK',
       onPress: ()=> {
         navigation.navigate('Login')}
     }])
   }
   else{
     Alert.alert('Error', 'Usuario expirado, favor logar novamente',[{
       text: 'OK',
       onPress: ()=> {
         navigation.navigate('Login')}
     }])
   } 
});
    this.setState({canalselect: response.data[index].resultList})
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
                  
            <Button
            title={item.category}
            buttonStyle={{ backgroundColor: '#fff000', width: 200, height: 50,}}
            containerStyle={{
              width: 200,
              marginBottom: 5,
            }}
            radius={10}
            titleStyle={{ color: 'black', marginHorizontal: 20, fontSize:13, }}
            onPress={()=> this.attcanal(index)}
          />
                }
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
          marginLeft={-2}
          renderItem={({item})=> 
            <TouchableOpacity
            style ={{width: 200,
              height: 150,
              borderRadius: 10,
              borderWidth: 3,
              backgroundColor: this.state.botaolatdireito,
              borderColor:'#fff',
              margin:3,}}
            onPress={()=> this.navigation.navigate('Videoplayer', {paramKey: item.link})}>
                <View style={styles.viewbotaodireito}>
                <Text style={styles.texto}>{item.dataName}</Text>
                <Image style={styles.imagem} source={this.logo(item.logo)}></Image>
             
            </View>
          </TouchableOpacity>}/>
        </View>
      </View>  
        
       
  
    );}}
    
export default Mainpagechannels

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
      marginLeft: 5,
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
 
  viewbotaodireito:{
    alignItems: 'center',
    justifyContent: 'center',
  
    
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
    marginTop: 20,
  },
});