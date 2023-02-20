import React, { Component} from 'react';
import {View, StyleSheet, StatusBar, TextInput, Text, TouchableOpacity, ActivityIndicator, Image, Alert} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import api from '../src/services/getapi';
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MyButton from '../src/services/focused';





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
        envioprops: '',
        cordefundodireito: '#000',
        cordefundoesquerdo: '#fff000',
        buttonFocused: false,
        
       };
       this.navigation = this.props.navigation;
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
  const value = await AsyncStorage.getItem('token')
  const response = await api.get('/serie', {headers:{
   'Authorization': `Bearer ${value}`
  }}).catch((error)=>{
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
        return channels.name.toLowerCase().indexOf(this.state.searchbar.toLowerCase()) !== -1
       })
       return filtrado
    }
  }
  
logo(ulrlogo){
    if(ulrlogo == ''){
      return require('../src/logo.jpg')
    } 
      else{
        return {uri: ulrlogo}
      }
  }

async attcanal(index, navigation){
  const value = await AsyncStorage.getItem('token')
  const response = await api.get('/serie', {headers:{
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
    this.setState({indice: index})
    this.setState({canalselect: response.data[index].series})
    
}
handleFocus = () => {
  this.setState({ buttonFocused: true });
}

handleBlur = () => {
  this.setState({ buttonFocused: false });
}

async envioserie(indice1, indice2){
  const value = await AsyncStorage.getItem('token')
  const response = await api.get('/serie', {headers:{
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
  this.setState({envioprops: response.data[indice1].series[indice2]})
  return this.navigation.navigate('Series', {paramKey: this.state.envioprops})
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
                                
          <Button
            title={item.category}
            buttonStyle={{ backgroundColor: '#fff000', width: 200, height: 50,}}
            containerStyle={{
              width: 200,
              marginBottom: 5,
            }}
            radius={10}
            titleStyle={{ color: 'black', marginHorizontal: 20, fontSize:13, }}
            onPress={()=> this.attcanal(index, this.navigation)}
          />
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

            <TouchableWithoutFeedback
            
            style ={{width: 200,
              height: 300,
              borderRadius: 10,
              borderWidth: 3,
              backgroundColor: this.state.botaolatdireito,
              borderColor:'#fff',
              margin:3,}}
               onPress={()=> this.envioserie(this.state.indice, item.index)}>
          <View style={styles.container} tvParallaxProperties={{ pressMagnification: 1.1 }}>
 
        <Text style={styles.title}>Meu Componente</Text>
        <MyButton
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onPress={this.handleButtonPress}
          text="Clique aqui"
          imageSource={this.logo(item.logo)}
          hasTVPreferredFocus={this.state.buttonFocused}
        />
      </View>
          </TouchableWithoutFeedback>}/>
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
    justifyContent: 'center'
    
  },
  imagem:{
    width: 150,
    height: 200,
    resizeMode: 'contain',
    

  },
  texto:{
    width: 150,
    marginTop: 20,
    color:'#fff',
    backgroundColor:'#2ff9',
    fontSize: 15,
    padding: 2,
    borderRadius: 2,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    textAlign: 'center'
  },
});