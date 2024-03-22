// ManageCircleScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ManageCircleScreen({ route }) {
  const { circleName, friends } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Circle Name: {circleName}</Text>
      <Text style={styles.subtitle}>Friends:</Text>
      <View style={styles.friendsContainer}>
        {friends && friends.length > 0 ? (
          friends.map((friend, index) => (
            <Text key={index} style={styles.friend}>
              {friend.name} {/* Assuming 'name' is a property of each friend object */}
            </Text>
          ))
        ) : (
          <Text>No friends;( </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(249, 217, 250, 1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendsContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  friend: {
    fontSize: 16,
    marginBottom: 5,
  },
});

