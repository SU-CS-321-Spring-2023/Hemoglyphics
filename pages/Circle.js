import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ManageCircleScreen from './ManageCircleScreen';
import NewCircleScreen from './NewCircleScreen'; // Import NewCircleScreen component

const Stack = createStackNavigator();

export default function Circle({ route, navigation }) {

  const { userID } = route.params
  console.log("USER ID FROM CIRCLES : " + userID)
  const [circleNames, setCircleNames] = useState([]);

  const handlePress = () => {
    navigation.navigate('NewCircle', { onCircleCreated: handleCircleCreated });
  };

  const handleCircleCreated = (circleName, friends) => {
    setCircleNames([...circleNames, { name: circleName, friends: friends }]);
    navigation.goBack(); // Navigate back to the main circle screen after creating a new circle
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.plusContainer}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>View Circles</Text>
      </View>
      <FlatList
        data={circleNames}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ManageCircle', { circleName: item.name, friends: item.friends })} style={styles.circleItem}>
            <View style={styles.transparentCircle}></View>
            <Text style={styles.circleName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 217, 250, 1)',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  plusContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Set background color to transparent
  },
  plusText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  circleItem: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  circleName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 15,
    paddingHorizontal: 20,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  transparentCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Transparent black color
    zIndex: 0,
  },
  listContainer: {
    marginTop: 40, // Adjust the marginTop as needed
  },
});



