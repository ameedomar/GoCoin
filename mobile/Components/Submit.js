import React from 'react';
import { View,StyleSheet,Image,Text, ImageBackground, TextInput,TouchableOpacity} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign'
import {Butten} from 'react-native-elements';
import { Button } from 'react-native';

const Submit = props => {
    return(
<TouchableOpacity style={[styles.container, {backgroundColor:props.color}]}>
<Text style={styles.submitText} >
    {props.title}
</Text>
</TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    container:{
       
        width: '75%',
        height:55,
        borderRadius:100,
        marginVertical:5,
        alignSelf:'center',
        top:30,
    },
    submitText:{
        fontSize:25,
        fontWeight:'bold',
        color: 'white',
        alignSelf:'center',
        marginVertical:10,
        opacity:.6
    }
})



export default Submit;