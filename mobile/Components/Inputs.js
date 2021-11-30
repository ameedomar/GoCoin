import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {TextInput} from 'react-native';
class Inputs extends Component{
    state={isFocused:false};
    onFocusChange = () =>{
        this.setState({isFocused:true})
    }
    render() {
        return(
            <View style={[styles.container,{borderColor:this.stateisFocused ? '#79b6b8':'#79b6b8'}]}>
              <TextInput
              borderColor={this.stateisFocused ? '#93b1c2':'#b4d1e1'}
              placeholder={this.props.name}
              onFocus={this.onFocusChange}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              secureTextEntry={this.props.pass}
              leftIcon={
                  <Icon 
                  name={this.props.icon}
                  size={30}
                  color={this.state.isFocused ? '#79b6b8' : '#79b6b8'}
                  />
              }

              >
                  </TextInput>

            </View>

        );
    };
};

const styles =StyleSheet.create({
    container:{
        top:10,
        width: '75%',
         height:55,
         borderRadius:100,
         marginVertical:10,
         borderWidth:3.5,
         alignSelf:'center',
        
      
    },
    inputContainer:{
        borderBottomWidth:0
    },
    inputText:{
        color :'#636169',
        fontWeight :'bold',
        marginLeft:5
    },

});

export default Inputs;