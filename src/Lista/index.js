import React, {Component} from 'react'
import { View, Text, StyleSheet} from 'react-native'

class Filme extends Component{
    render(){
        return(
            <View>
                <Text styles={styles.container}>{this.props.data.id}</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
     color: '#fff'
    },
  });
export default Filme