import React, { Component} from 'react';
import {View, StyleSheet, StatusBar, TouchableHighlight, TouchableOpacity, Text, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { FlashList } from "@shopify/flash-list";
import api from '../src/services/getapi';


async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
 
}
changeScreenOrientation()


class Series extends Component{
  constructor(props){
    super(props);
    this.state = {
        indice: '0',
        contador: 0,
        propriedade: this.props.route.params.paramKey.episodes[0]
       };
       this.navigation = this.props.navigation;
       this.route = this.props.route;
       this.attserie = this.attserie.bind(this)
       this.logo = this.logo.bind(this)
       
    }
attserie(indice){
  this.setState({propriedade: this.props.route.params.paramKey.episodes[indice] })
  return this.state.propriedade
}
logo(ulrlogo){
  if(ulrlogo == ''){
    return require('../src/logo.jpg')
  } 
    else{
      return {uri: ulrlogo}
    }
}
render(){
  return (
      
      <View style={{flex: 1, backgroundColor: "#000", flexDirection: 'row'}}>
          <View style={styles.leftview}>
          <FlashList
            data={this.props.route.params.paramKey.episodes}
            key={item => item.id}
            estimatedItemSize={10000}
            numColumns={1}
            renderItem={({item, index})=> 
            <TouchableHighlight
            underlayColor={'#000'}
            activeOpacity={0.6}
            onPress={()=> this.attserie(index)}>
            <View style={styles.botaoleft}>
              <Text style={styles.texto}>Sesson {index +1}</Text>
            </View>
          </TouchableHighlight>}/>
        </View>
        <View style={styles.rigthview}>
          <FlashList
            data={this.state.propriedade}
            key={item => item.id}
            estimatedItemSize={10000}
            numColumns={3}
            extraData={this.state.propriedade}
            renderItem={({item, index})=> 

            <TouchableOpacity
            style ={styles.botaolatdireito}
            onPress={()=> this.navigation.navigate('Videoplayer', {paramKey: item.link})}>
            <View style={styles.viewbotaodireito}>
                <Text style={styles.texto2}>{item.dataName}</Text>
                <Image style={styles.imagem2} source={this.logo(item.logo)}></Image>
             
            </View>
          </TouchableOpacity>}/>
        </View>
      </View>
  
    );
  }
}
    
export default Series

const styles = StyleSheet.create({
  container:{ 
      flex: 1,
      backgroundColor: "#000",
      display: 'flex'
   
      },
      viewbotaodireito:{
        alignItems: 'center',
        justifyContent: 'center'
        
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
      },
  botaoleft:{
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

  imagem2:{
    width: 150,
    height: 200,
    resizeMode: 'contain',
    

  },
  imagem:{
      width: 100,
      height: 100,
      
    },
  texto:{
      color: "#000"      
  },
 texto2:{ 
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
 },
  botaolatdireito:{
    width: 200,
    height: 300,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: '#000',
    borderColor:'#fff',

    margin:3,
},
  leftview:{
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
  },

  rigthview:{
    backgroundColor: '#000',
    flex: 3,
    marginBottom: 10,
    marginTop: 10,
},
});