import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

export default function NewCircleScreen({ navigation }) {
  const [circleName, setCircleName] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friends, setFriends] = useState([]);

  const addFriend = () => {
    if (friendName.trim() !== '') {
      setFriends([...friends, friendName]);
      setFriendName('');
    }
  };

  const createCircle = () => {
    if (circleName.trim() !== '') {
      const newCircle = {
        name: circleName,
        friends: friends,
      };
      console.log('New Circle:', newCircle);
      navigation.goBack(); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Circle: </Text>
      <TextInput
        style={styles.input}
        value={circleName}
        onChangeText={setCircleName}
        placeholder="Enter Circle Name"
      />
      <TextInput
        style={styles.input}
        value={friendName}
        onChangeText={setFriendName}
        placeholder="Enter Friend Name"
      />
      <Button title="Add Friend" onPress={addFriend} color="rgba(107, 69, 150, 1)" />
      <View style={styles.friendsContainer}>
        <Text style={styles.friendsTitle}>Friends:</Text>
        {friends.map((friend, index) => (
          <Text key={index} style={styles.friend}>
            {friend}
          </Text>
        ))}
      </View>
      <Button title="Create Circle" onPress={createCircle} color="rgba(107, 69, 150, 1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 217, 250, 1)',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  friendsContainer: {
    marginTop: 20,
  },
  friendsTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  friend: {
    marginBottom: 5,
  },
});
