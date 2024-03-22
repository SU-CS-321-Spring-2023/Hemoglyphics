import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View, Button, Pressable} from 'react-native';

// defining the circle object (this should go somewhere else)
const Circle = ({ circleStyle, text, onPress}) => {
  return (
        <TouchableOpacity onPress={onPress} style={[styles.circle, circleStyle]}>
            <Text style={styles.circleText}>{text}</Text>
        </TouchableOpacity>
  );
};

// layout for Home screen
const HomeScreen = ({navigation}) => {
    return(
      <View style={styles.appContainer}>
         <Circle circleStyle={[styles.circle1, { zIndex: 4 },{ top: '20%', left: 40 }]} text="Friends" onPress={() => navigation.navigate('Friends List')}/>
         <Circle circleStyle={[styles.circle2, { zIndex: 2 },{ top: '51%', left: 29 }]} text="Circle" onPress={() => navigation.navigate('Circle')}/> 
         <Circle circleStyle={[styles.circle3, { zIndex: 5 },{ top: '5%', right: 40 }]} text="Maps" onPress={() => navigation.navigate('Maps')}/> 
         <Circle circleStyle={[styles.circle5, { zIndex: 3 },{ top: '37%', right: 38 }]} text="Messages" onPress={() => navigation.navigate('Messages')}/> 
         <Circle circleStyle={[styles.circle4, { elevation: 0 },{ top: '66%', right: 46 }]} text="Log" onPress={() => navigation.navigate('Log')}/> 
      </View>
    )
}

// Styling
const CircleColor = 'rgba(107, 69, 150, 1)';
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 217, 250, 1)',
  },
  circle: {
   borderWidth : 2,
    borderColor: 'pink',
    width: 190,
    height: 190,
    borderRadius: 190 / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  // we must consolidate this int one class
  circle1: {
    backgroundColor: 'rgba(107, 69, 150, 1)',
  },
  circle2: {
    backgroundColor: 'rgba(107, 69, 150, 1)',
  },
  circle3: {
    backgroundColor: 'rgba(107, 69, 150, 1)',
  },
  circle4: {
    backgroundColor: 'rgba(107, 69, 150, 1)',
  },
  circle5: {
    backgroundColor: 'rgba(107, 69, 150, 1)',
  },
});


export default HomeScreen;
