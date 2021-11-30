import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignupPage from './screens/SignupPage';
import LoginScreen from './screens/LoginScreen';
import Calculater from './Components/Calculater';

import main from './screens/Main';
import Profile from './screens/Profile';
const Stack = createStackNavigator();
const Navigation = props => {
    return(
 <NavigationContainer>
        <Stack.Navigator initialRouteName = "Home" independent={true}>
             <Stack.Screen name="Home" component={LoginScreen} options ={{headerShown: false}} />
             <Stack.Screen name="SignUp" component={SignupPage} options ={{headerShown: false}} />
             <Stack.Screen name="Main" component={main} options ={{headerShown: false}} />
             <Stack.Screen name="Profile" component={Profile} options ={{headerShown: false}} />
            </Stack.Navigator>
</NavigationContainer>
    );

};

export default Navigation;