import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const MessageListScreen = ({ navigation }) => {
  // Dummy data for friends list
  const friendsData = [
    { id: '1', name: 'Friend 1' },
    { id: '2', name: 'Friend 2' },
    { id: '3', name: 'Friend 3' },
    // Add more friends as needed
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.friendItem} onPress={() => navigation.navigate('Messages', { friendId: item.id })}>
      <Text style={styles.friendName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Friend to Message</Text>
      <FlatList
        data={friendsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.friendsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9D9FA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6B4596',
  },
  friendsList: {
    alignItems: 'center',
  },
  friendItem: {
    backgroundColor: '#E5D9F4',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  friendName: {
    fontSize: 18,
    color: '#6B4596',
  },
});

export default MessageListScreen;
