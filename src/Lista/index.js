import React, {Component} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity,StatusBar} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as ScreenOrientation from 'expo-screen-orientation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
   
  }
  changeScreenOrientation()



class Filme extends Component{
    render(){
        return(
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <View  style={styles.quadrado}>
                    <TouchableOpacity onPress={navigation.navigator}>
                        <Image style={styles.imagem} source={{uri: this.props.data.logo}}></Image>
                        <Text style={styles.texto}>{this.props.data.dataName}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{ 
        flex: 1,
        backgroundColor: "#000",
        display: 'flex',
     
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
export default Filme