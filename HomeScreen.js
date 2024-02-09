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
         <Circle circleStyle={[styles.circle1, { zIndex: 3 },{ top: '25%', left: 50 }]} text="Friends" onPress={() => navigation.navigate('Friends List')}/>
         <Circle circleStyle={[styles.circle2, { elevation: 1 },{ top: '65%', left: 20 }]} text="Circle" onPress={() => navigation.navigate('Circle')}/> 
         <Circle circleStyle={[styles.circle3, { zIndex: 4 },{ top: '5%', right: 10 }]} text="Maps" onPress={() => navigation.navigate('Maps')}/> 
         <Circle circleStyle={[styles.circle5, { elevation: 1 },{ top: '47%', right: 20 }]} text="Messages" onPress={() => navigation.navigate('Messages')}/> 
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
    width: 230,
    height: 230,
    borderRadius: 230 / 2,
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
