import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Create a stack navigator
const Stack = createStackNavigator();

// Create a new component for the screen to name the circle and add friends
function NewCircleScreen() {
  return (
    <View style={styles.container}>
      {/* Content for naming the circle and adding friends */}
      <Text>New Circle Screen</Text>
    </View>
  );
}

// Modify the Circle component to navigate to the new screen
export default function Circle({ navigation }) {
  const handlePress = () => {
    // Navigate to the NewCircleScreen when the plus sign is pressed
    navigation.navigate('NewCircle');
  };

  return (
    <View style={styles.container}>
      {/* Render existing circles */}
      <TouchableOpacity onPress={handlePress} style={styles.plusContainer}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 217, 250, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusContainer: {
    position: 'absolute',
    top: 20,  // Adjusted positioning to be at the top
    right: 20,  // Positioned it to the right
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // To make sure the plus sign is above other content
    backgroundColor: 'transparent', // Set background color to transparent
  },
  plusText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
});


