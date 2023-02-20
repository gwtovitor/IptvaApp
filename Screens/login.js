import React, { Component} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Linking, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import apipost from '../src/services/postapi';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../src/services/getapi';




async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 
}


changeScreenOrientation()

class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
        login: '',
        senha: '',
        msg: '',
        token: '',
        secure: true,
        isfocused: false,
        img: require('../src/show.png'),
       };
       this.navigation = this.props.navigation;
       this.autenticação = this.autenticação.bind(this)
       this.start = this.start.bind(this)
       this.hiddenicon = this.hiddenicon.bind(this)
       this.onFocusChange = this.onFocusChange.bind(this)
 }


 async start(){

      try{
        const value = await AsyncStorage.getItem('token')
        if(value !== null){
          const login = await api.get('/serie', {headers:{
            'Authorization': `Bearer ${value}`
          }}).then((response)=>{
              if(response.data){
                this.navigation.navigate('Choicepage')
              }
          })
        }else{
          return
        }
    }catch(e){
      
    }
}

hiddenicon(state){
  if (state != true){
    this.setState({secure: true})
    this.setState({img: require('../src/show.png')})

  }else{
    this.setState({secure: false})
    this.setState({img: require('../src/hidden.png')})
  }
}
onFocusChange =()=>{
  this.setState({isFocused: true});
  console.log('estou focado porra')
}
 async autenticação(){

  if(this.state.login == '' || this.state.senha == ''){
      this.setState({msg: 'Digite um usuario e Senha'})
    }else{
    const login = await apipost.post('/login', { username: this.state.login,
                                  password: this.state.senha})
                                  .then((response)=>{
                                    if(response.data.message == 'Username or Password invalid.'){
                                        this.setState({msg: 'Usuario ou Senha Invalida!'})
                                      }else{
                                          this.setState({token: response.data.token})
                                          
                                         try{
                                          AsyncStorage.setItem('token', this.state.token)
                                          this.navigation.replace('Choicepage')
                                         } catch (e){
                                           
                                         }
                                         
                                        }
                                    
                                  })
        .catch(function (error) {
          if (error.response) {

        console.log(error.response.data);
        console.log('----------data up------------')

        console.log(error.response.status);
        console.log('-----------status up-----------')
        console.log(error.response.headers);
        console.log('----------headers up------------')
      } 
      console.log(error.config);
      console.log('--------------config up --------')
    });
    }}

  render(){
    this.start()
    return(
      
        <View style={styles.container}> 
            <StatusBar hidden={true}/>
            <Text style={styles.textologin}> TELEVIDO </Text>
      
                <TextInput underlineColorAndroid = "transparent"
                placeholder='Digite o seu Login'
                onChangeText={(user) => {this.setState({login: user.toLowerCase()}) }}
                style={styles.inputlogin}>
                </TextInput>
           <View style={{flexDirection: 'row'}}>
            <TextInput underlineColorAndroid = "transparent" 
            placeholder='Digite sua senha' 
            secureTextEntry={this.state.secure}
            style={styles.inputsenha}
            onFocus={this.onFocusChange}
            onChangeText={(senha) => this.setState({senha: senha}) }></TextInput>
            <TouchableOpacity style={{marginTop: 12, marginLeft: -60, }}onPress={()=> this.hiddenicon(this.state.secure)}><Image source={this.state.img} style={{width: 50, height: 25}}></Image></TouchableOpacity>
            </View>
          <View>
            <TouchableOpacity 
            onPress={()=> this.autenticação()} 
            style={styles.botaoarea}>
              <Text>ENTRAR</Text>
            </TouchableOpacity>
            </View>
                <Text style={{color: 'red', fontSize:12}}>{this.state.msg}</Text>
                <TouchableOpacity 
                onPress={() => { 
                  Linking.openURL('https://wa.me/5581986716936?text=Ol%C3%A1%20Televido,%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20ou%20ajuda.'); 
                }}> 
                <Text style={styles.textocontato}>
                Whatsapp para contato   
                  <Text style={{color:"#2f2", marginLeft:3, marginTop:1,}} > (81)98671-6936 
                  </Text>
                  </Text>
                </TouchableOpacity>
        

            <Text style={styles.textodev}>
                Devlopers: GwTo / D3gS
            </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  inputlogin:{
    borderColor: 'black',
    width: 300,
    height: 40, 
    margin: 5,
    borderWidth: 2,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: 10,
    marginLeft: 17,
  },
  inputsenha:{
    borderColor: 'black',
    width: 300,
    height: 40, 
    margin: 5,
    borderWidth: 2,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: 10,
  },
  textologin:{
    fontSize: 20,
    color: 'red',
    fontSize: 30,
    paddingBottom: 20,
    fontWeight: 'bold',

  },
 
  botaoarea:{
    width: 200,
    height: 40,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 15,
  },
  textocontato:{
    color:'#fff',
    fontSize: 14,
  },
  textodev:{
    color:'#fff',
    fontSize: 10,
    marginTop: 20,
  },
});
export default Login
