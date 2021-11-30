import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
export default class Form extends Component {
    constructor(props){        
      super(props);        
      this.state={            
         email:'',
         password: ''        
      } 
 }

 
 saveData =async()=>{
    const {email,password} = this.state;

    //save data with asyncstorage
    let loginDetails={
        email: email,
        password: password
    }

    if(this.props.type !== 'LoginScreen')
    {
        AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));

        Keyboard.dismiss();
        alert("You successfully registered. Email: " + email + ' password: ' + password);
        this.LoginScreen();
    }
    else if(this.props.type == 'LoginScreen')
    {
        try{
            let loginDetails = await AsyncStorage.getItem('loginDetails');
            let ld = JSON.parse(loginDetails);

            if (ld.email != null && ld.password != null)
            {
                if (ld.email == email && ld.password == password)
                {
                    alert('Go in!');
                }
                else
                {
                    alert('Email and Password does not exist!');
                }
            }

        }catch(error)
        {
            alert(error);
        }
    }
}


showData = async()=>{
    let loginDetails = await AsyncStorage.getItem('loginDetails');
    let ld = JSON.parse(loginDetails);
    alert('email: '+ ld.email + ' ' + 'password: ' + ld.password);
}



}