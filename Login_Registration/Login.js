import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Button, Animated, Easing, TouchableOpacity } from 'react-native';

export default function App({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [circlePosition, setCirclePosition] = useState(new Animated.Value(0));

  useEffect(() => {
    moveCircles();
  }, []);

  const handleLogin = () => {
    console.log('Login button clicked!');
    navigation.navigate('Welcome!');
  };

  const moveCircles = () => {
    Animated.sequence([
      Animated.timing(circlePosition, {
        toValue: 1.1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.timing(circlePosition, {
        toValue: 1,
        duration: 2000,
        easing: Easing.bounce,
        useNativeDriver: false,
      })
    ]).start();
  };

  const circle1Position = circlePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-220, 500],
  });

  const circle2Position = circlePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [500, -220],
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

          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleLogin} color="#6b4596" />
          </View>

          <View style={styles.signupPromptContainer}>
            <Text style={styles.signupPromptText}>Wanna join the party? </Text>
            <TouchableOpacity onPress={() => {navigation.navigate('Registration')}}>
              <Text style={styles.signupPromptLink}>Register</Text>
            </TouchableOpacity>
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
    borderRadius: 200,
    borderColor: '#6b4596',
    borderWidth: 4,
    backgroundColor: 'white',
    position: 'absolute',
    right: -50,
    bottom: 200,

  },
  circle2: {
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#6b4596',
    borderColor: 'white',
    borderWidth: 4,
    position: 'absolute',
    left: -100,
  },
  circleContainer: {
    position: 'relative',
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 217, 250, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: 60,
    marginBottom: 80,
    paddingHorizontal: 30,
    paddingVertical: 30,
    width: '90%',
    backgroundColor: 'rgba(107, 69, 150, 0.1)',
    borderRadius: 20,
    shadowColor: 'rgb(107, 69, 150)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.8,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#6b4596',
    marginBottom: -50,
    marginLeft: 20,
    textAlign: 'left',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 50,
    width: '50%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  signupPromptContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -25,
  },
  signupPromptText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    
    
  },
  signupPromptLink: {
    fontSize: 18,
    color: '#6b4596',
    fontWeight: 'bold',
    
  },
});
