import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { allFriends } from './Friends.js'; // Importing allFriends array from Friends.js

export default function NewCircleScreen({ navigation, route }) {
  const [circleName, setCircleName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const [selectedFriendIndex, setSelectedFriendIndex] = useState(-1); // State to manage selected friend index

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectFriend = (index) => {
    setSelectedFriendIndex(index);
    setIsOpen(false); // Close dropdown after selection
  };

  const addFriend = () => {
    if (selectedFriendIndex !== -1) {
      const friendToAdd = allFriends[selectedFriendIndex];
      setSelectedFriends([...selectedFriends, friendToAdd]);
    }
  };

  const createCircle = () => {
    if (circleName.trim() !== '') {
      const newCircle = {
        name: circleName,
        friends: selectedFriends,
      };
      route.params.onCircleCreated(circleName, selectedFriends); // Pass circleName and selectedFriends back to Circle component
      navigation.navigate('Circle', { circleName, friends: selectedFriends }); // Navigate back to the main circle screen after creating a new circle 
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
      <View style={styles.dropdownContainer}>
        <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
          <Text>{selectedFriendIndex !== -1 ? allFriends[selectedFriendIndex].name : 'Select Friend'}</Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.dropdown}>
            {allFriends.map((friend, index) => (
              <TouchableOpacity key={index} onPress={() => selectFriend(index)} style={styles.dropdownItem}>
                <Text>{friend.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <Button title="Add Friend" onPress={addFriend} color="rgba(107, 69, 150, 1)" />
      <View style={styles.friendsContainer}>
        <Text style={styles.friendsTitle}>Selected Friends:</Text>
        {selectedFriends.map((friend, index) => (
          <Text key={index} style={styles.friend}>
            {friend.name}
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
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdownHeader: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  dropdownItem: {
    padding: 10,
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

