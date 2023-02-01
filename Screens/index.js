import React, {Component} from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity,StatusBar, Video} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';


async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
   
  }
  changeScreenOrientation()


class Filme extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visivel: false
           };
       
}



    render(){
        return(
            <View style={styles.container}>
        
                <StatusBar hidden={true}/>
                <View  style={styles.quadrado}>
                    
                    <TouchableOpacity>
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
        zIndex: 9000,
     
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