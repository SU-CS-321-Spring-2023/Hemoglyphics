import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen.js';
import Friends from './pages/Friends.js';
import Circle from './pages/Circle.js';
import Maps from './pages/Maps.js';
import Messages from './pages/Messages.js'
import Message_Board from './pages/MessageBoard.js';
import Login from './Login_Registration/Login.js';
import Registration from './Login_Registration/Registration/Registration.js';
import Log from './pages/Log.js';
import NewCircleScreen from './pages/NewCircleScreen.js';
import ManageCircleScreen from './pages/ManageCircleScreen.js';

const Stack = createStackNavigator();

// all possible pages that we have (at this moment)
const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name="Welcome" component={HomeScreen} options={{
                    title: "Welcome",
                    headerStyle: {
                        backgroundColor: 'rgba(249, 217, 250, 1)', 
                    }
                }}/> 
                <Stack.Screen name="Friends List" options={{
                    title: "Friends List",
                    headerStyle: {
                        backgroundColor: 'rgba(249, 217, 250, 1)', 
                    }
                }}
                    component={Friends} />
                <Stack.Screen name="Circle" component={Circle} />
                <Stack.Screen name="Maps" component={Maps} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registration" component={Registration} options={{
                    headerShown: false,
                }}/>
                <Stack.Screen name="Log" component={Log} options={{
                    headerStyle: {
                        backgroundColor: 'rgba(249, 217, 250, 1)'
                    }
                }}
                /> 
                <Stack.Screen name="NewCircleScreen" component={NewCircleScreen} options ={{
                    headerShown:false,
                }}/>
                <Stack.Screen name="NewCircle" component={NewCircleScreen} />
                <Stack.Screen name="ManageCircle" component={ManageCircleScreen} />
                <Stack.Screen name="Message Board" component={Message_Board} options={{
                    title:''
                }}
                />
                <Stack.Screen name="Messages" component={Messages} options={{
                    title:''
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )};

const styles = StyleSheet.create({
    friends: {
        backgroundColor: 'black',
    }
})

export default Navigation;
