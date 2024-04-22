import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Animated, Easing, Alert } from 'react-native';

export default function Registration({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [circlePosition, setCirclePosition] = useState(new Animated.Value(0));
  var userId;

  useEffect(() => {
    moveCircles();
  }, []);

  const handleRegistration = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await Axios.post("http://146.190.61.157:12000/register", {
        userName: username,
        password: password,
        email: email
      });
      const responseData = response.data;
      userId = responseData.userId;
      if (responseData.userId) {
        console.log(userId);
        navigation.navigate("Welcome");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validateInputs = () => {
    if (!email || !username || !password || !reEnterPassword) {
      Alert.alert('Error', 'Please fill out all fields!');
      return false;
    }

    if (password !== reEnterPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return false;
    }

    return true;
  };

  const moveCircles = () => {
    Animated.sequence([
      Animated.timing(circlePosition, {
        toValue: 1.1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.timing(circlePosition, {
        toValue: 1,
        duration: 3000,
        easing: Easing.bounce,
        useNativeDriver: false,
      })
    ]).start();
  };

  const circle1Position = circlePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-220, 600], // Start and end positions for circle1
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
    borderRadius: 1000,
    borderColor: '#6b4596',
    borderWidth: 4,
    backgroundColor: 'white',
    position: 'absolute',
    right: 0,
  },
  circle2: {
    width: 400,
    height: 400,
    borderRadius: 1000,
    backgroundColor: '#6b4596',
    borderColor: 'white',
    borderWidth: 4,
    position: 'absolute',
    left: 0,
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
    fontSize: 60,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    paddingTop: 100,
    paddingLeft: 15,
    color: '#6b4596',
    marginBottom: 120,
    marginLeft: 20,
    textAlign: 'left',

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
