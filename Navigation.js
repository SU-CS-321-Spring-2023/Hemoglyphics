import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen.js';
import Friends from './pages/Friends.js';
import Circle from './pages/Circle.js';
import Maps from './pages/Maps.js';
import Messages from './pages/Messages.js'


const Stack = createStackNavigator();

// all possible pages that we have (at this moment)
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName= "Home">
                <Stack.Screen name="Home" component={HomeScreen} /> 
                <Stack.Screen name="Friends" component={Friends} />
                <Stack.Screen name="Circle" component={Circle} />
                <Stack.Screen name="Maps" component={Maps} />
                <Stack.Screen name="Messages" component={Messages} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Navigation;