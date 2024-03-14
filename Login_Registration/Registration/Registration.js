import React, { useState, useEffect } from 'react';
const { Register, registerUser } = require('../../scripts/Register.js');
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Dimensions, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Animated, Easing } from 'react-native';

export default function Registration({navigation}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [circlePosition, setCirclePosition] = useState(new Animated.Value(0));

  useEffect(() => {
    // Move the circles when the component mounts
    moveCircles();
  }, []);

  const handleRegistration = () => {
      // Implement the registration logic here
      if(registerUser(username, password, email)){
        navigation.navigate('Welcome!');
      }
    };

  const moveCircles = () => {
    Animated.sequence([
      Animated.timing(circlePosition, {
        toValue: 1.1, // Slightly overshoot the final value
        duration: 200, // Duration of the animation
        easing: Easing.out(Easing.quad), // Ease out animation
        useNativeDriver: false, // Required for animations not supported by native driver
      }),
      Animated.timing(circlePosition, {
        toValue: 1, // End value
        duration: 3000, // Duration of the animation
        easing: Easing.bounce, // Bounce effect
        useNativeDriver: false, // Required for animations not supported by native driver
      })
    ]).start(); // Start the animation
  };

  const circle1Position = circlePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-220, 500], // Start and end positions for circle1
  });

  const circle2Position = circlePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [500, -220], // Start and end positions for circle2
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, { top: circle1Position }]} />
        <Animated.View style={[styles.circle2, { top: circle2Position }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.circleContainer}>
          <Text style={styles.title}>Registration</Text>
        </View>

        <View style={styles.textContainer}>
          <Text>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: 'white' }]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />

          <Text>Username</Text>
          <TextInput
            style={[styles.input, { backgroundColor: 'white' }]}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />

          <Text>Password</Text>
          <TextInput
            style={[styles.input, { backgroundColor: 'white' }]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="Enter your password"
          />

          <Text>Re-enter Password</Text>
          <TextInput
            style={[styles.input, { backgroundColor: 'white' }]}
            value={reEnterPassword}
            onChangeText={setReEnterPassword}
            secureTextEntry={true}
            placeholder="Re-enter your password"
          />

          {/* Button container */}
          <TouchableOpacity onPress={handleRegistration} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 400,
    height: 400,
    borderRadius: 1000, // Half of the width/height to make it a circle
    borderColor: '#6b4596',
    borderWidth: 4, // Border width
    backgroundColor: 'white', // Color of the circle
    position: 'absolute',
    right: 0, // Adjust the right value to position it horizontally
  },
  circle2: {
    width: 400,
    height: 400,
    borderRadius: 1000, // Half of the width/height to make it a circle
    backgroundColor: '#6b4596', // Color of the circle
    borderColor: 'white',
    borderWidth: 4, // Border width
    position: 'absolute',
    left: 0, // Adjust the right value to position it horizontally
  },
  circleContainer: {
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 217, 250, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: 20,
    paddingHorizontal: 50,
    paddingVertical: 5,
    width: '100%',
    backgroundColor: 'rgba(107, 69, 150, 0.1)',
    borderRadius: 50,
    shadowColor: 'rgb(107, 69, 150)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    color: '#bc8da0',
    marginBottom: 0,
    paddingTop: 100,
    paddingLeft: 15,
    
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    color: 'black',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#bc8da0',
    borderRadius: 10,
    height: 40,
    width: '55%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

