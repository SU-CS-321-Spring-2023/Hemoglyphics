import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Alert } from 'react-native';

export default function App({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://146.190.61.157:12000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        navigation.navigate('Welcome');
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textContainer}>
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
