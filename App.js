import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Circle = ({ circleStyle, text }) => {
  return (
    <View style={[styles.circle, circleStyle]}>
      <Text style={styles.circleText}>{text}</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.appContainer}>
      <Circle circleStyle={[styles.circle1, { top: '30%', left: 55 }]} text="Friends" />
      <Circle circleStyle={[styles.circle2, { top: '50%', left: 55 }]} text="Circle" />
      <Circle circleStyle={[styles.circle3, { top: '20%', right: 40 }]} text="Maps" />
      <Circle circleStyle={[styles.circle4, { top: '40%', right: 40 }]} text="Home" />
      <Circle circleStyle={[styles.circle5, { top: '60%', right: 40 }]} text="Messages" />
      <StatusBar style="auto" />
    </View>
  );
}

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






