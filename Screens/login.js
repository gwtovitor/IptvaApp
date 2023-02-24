import React, { Component} from 'react';
import {TouchableWithoutFeedback, View, Text, StyleSheet, StatusBar, TouchableOpacity, Linking, Image, ActivityIndicator, TextInput} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import apipost from '../src/services/postapi';
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
        loading: false,
       };
       this.navigation = this.props.navigation;
       this.autenticação = this.autenticação.bind(this)
       this.start = this.start.bind(this)
       this.hiddenicon = this.hiddenicon.bind(this)
       this.carregando = this.carregando.bind(this)
       this.firstTextInput = React.createRef();
       this.secondTextInput = React.createRef();
 }

handleFirstTextInputEndEditing = () => {
  // Faça o que precisar com o texto inserido no primeiro TextInput
  // Mova o foco para o segundo TextInput
  ;
}
handleSecondTextInputEndEditing = () => {
  // Faça o que precisar com o texto inserido no segundo TextInput
}


 async start(){

      try{
        const value = await AsyncStorage.getItem('token')
        if(value !== null){
          const login = await api.get('/channel', {headers:{
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

carregando(){
  if(this.state.loading == false){
    return (
      'ENTRAR'
    )
  }
  else if(this.state.msg){
    return (
      'ENTRAR'
    )
  }
  else{
    return (<View>
      <ActivityIndicator color="#009688" 
    size="large" 
    ></ActivityIndicator>
  </View>
  )
  }
}
 async autenticação(){

  if(this.state.login == '' || this.state.senha == ''){
      this.setState({msg: 'Digite um usuario e senha'})
    }else{
    this.setState({loading: true})
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
      } 
    });
    }}

  render(){
    this.start()
    const text = ''
    return(
      
        <View style={styles.container}> 
            <StatusBar hidden={true}/>
            <Text style={styles.textologin}> TELEVIDO </Text>
                <TextInput 
                  ref={this.firstTextInput}
                  autoFocus={true}
                  onEndEditing={()=> this.secondTextInput.current.focus()}
                  editable={true}
                placeholder='Digite o seu Login'
                onChangeText={(user) => {this.setState({login: user.toLowerCase()}) }}
                style={styles.inputlogin}>
                </TextInput>

           <View style={{flexDirection: 'row'}}>
            <TextInput underlineColorAndroid = "transparent" 
            placeholder='Digite sua senha' 
            ref={this.secondTextInput}
            onEndEditing={this.autenticação}
            secureTextEntry={this.state.secure}
            style={styles.inputsenha}
            onChangeText={(senha) => this.setState({senha: senha}) }></TextInput>
            <TouchableOpacity style={{marginTop: 12, marginLeft: -60, }}onPress={()=> this.hiddenicon(this.state.secure)}><Image source={this.state.img} style={{width: 50, height: 25}}></Image></TouchableOpacity>
            </View>
          <View>
            <TouchableOpacity 
            onPress={()=> this.autenticação()} 
            style={styles.botaoarea}>
              <Text>{this.carregando()}</Text>
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
