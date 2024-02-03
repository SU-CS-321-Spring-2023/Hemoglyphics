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
         <Circle circleStyle={[styles.circle1, { top: '30%', left: 55 }]} text="Friends" onPress={() => navigation.navigate('Friends')}/>
         <Circle circleStyle={[styles.circle2, { top: '50%', left: 55 }]} text="Circle" onPress={() => navigation.navigate('Circle')}/> 
         <Circle circleStyle={[styles.circle3, { top: '20%', right: 40 }]} text="Maps" onPress={() => navigation.navigate('Maps')}/> 
         <Circle circleStyle={[styles.circle4, { top: '40%', right: 40 }]} text="Home" onPress={() => navigation.navigate('')}/> 
         <Circle circleStyle={[styles.circle5, { top: '60%', right: 40 }]} text="Messages" onPress={() => navigation.navigate('Messages')}/> 
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
    backgroundColor: 'white',
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
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
