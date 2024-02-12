import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen.js';
import Friends from './pages/Friends.js';
import Circle from './pages/Circle.js';
import Maps from './pages/Maps.js';
import Messages from './pages/Messages.js'
import Registration from './Login_Registration/Registration/Registration.js';

const Stack = createStackNavigator();

// all possible pages that we have (at this moment)
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome!">
                <Stack.Screen name="Welcome!" component={HomeScreen} options={{
                    title: "Welcome",
                    headerStyle: {
                        backgroundColor: 'rgba(249, 217, 250, 1)', 
                    }
                }}/> 
                <Stack.Screen name="Friends List" options={{
                    title: "Friends List",
                    headerStyle: {
                        backgroundColor: 'teal',
                    }
                }}
                    component={Friends} />
                <Stack.Screen name="Circle" component={Circle} />
                <Stack.Screen name="Maps" component={Maps} />
                <Stack.Screen name="Messages" component={Messages} />
                <Stack.Screen name="Registration" component={Registration} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    friends: {
        backgroundColor: 'black',
    }
})

export default Navigation;
