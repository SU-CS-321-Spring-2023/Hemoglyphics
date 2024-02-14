import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Dimensions, ScrollView, StyleSheet, Text, TextInput, View, Button, Animated, Easing } from 'react-native';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [circlePosition, setCirclePosition] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate circles when the component mounts
    moveCircles();
  }, []);

  const handleLogin = () => {
    // Implement the login logic here
    console.log('Login button clicked!');
    // Set this to link to backend instead of just navigation 
    navigation.navigate("Welcome!");
  };

  const handleRegister = () => {
    console.log('Registration clicked');
    // Set this to link to backend instead of just navigation 
    navigation.navigate("Registration");
  }

  const moveCircles = () => {
    Animated.sequence([
      Animated.timing(circlePosition, {
        toValue: 1.1, // Slightly overshoot the final value
        duration: 500, // Duration of the animation
        easing: Easing.out(Easing.quad), // Ease out animation
        useNativeDriver: false, // Required for animations not supported by native driver
      }),
      Animated.timing(circlePosition, {
        toValue: 1, // End value
        duration: 2000, // Duration of the animation
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.textContainer}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />

          <Text>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="Enter your password"
          />
      <View style={styles.buttonBar}>
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleLogin} color="#6b4596" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Register" onPress={handleRegister} color="#6b4596" />
          </View>
      </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 400,
    height: 400,
    borderRadius: 200, // Ensuring circle shape
    borderColor: '#6b4596',
    borderWidth: 4,
    backgroundColor: 'white',
    position: 'absolute',
    right: -100, // Adjusted for aesthetic
  },
  circle2: {
    width: 400,
    height: 400,
    borderRadius: 200, // Ensuring circle shape
    backgroundColor: '#6b4596',
    borderColor: 'white',
    borderWidth: 4,
    position: 'absolute',
    left: -100, // Adjusted for aesthetic
  },
  circleContainer: {
    position: 'relative',
    height: 200, // Adjusting container height for the animation
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 217, 250, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex:1,
    justifyContent: 'center',
   // marginTop: 60,
   // marginBottom: 80,
    paddingHorizontal: 40,
    paddingVertical: 20,
    width: '90%',
    backgroundColor: 'rgba(107, 69, 150, 0.1)',
    borderRadius: 20,
    shadowColor: 'rgb(107, 69, 150)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6b4596',
    marginBottom: 20,
    textAlign: 'center', // Center the title text
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: 'black',
    borderRadius: 10,
    backgroundColor: 'white', // Ensuring background color for visibility
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 30,
    width: '50%', // Adjust the width as needed
    borderRadius: 10,
    overflow: 'hidden', // Keeps the button's ripple effect within the container's rounded corners
  },
  buttonBar:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

