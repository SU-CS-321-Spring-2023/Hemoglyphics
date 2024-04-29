import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
    list: {},
    text: {
        marginLeft: 30,
        fontSize: 16,
    },
    entry: {
        flexDirection: 'row',
        padding: 20,
        marginTop: 3,
        marginBottom: 3,
        backgroundColor: 'white',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'rgba(107, 69, 150, 1)',
    },
    pfpContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 60,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        fontSize: 30,
        color: 'rgba(107, 69, 150, 1)',
        textTransform: 'uppercase',
    },
    friendParse: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'space-between',
    },
    search: {
        borderWidth: 1,
        borderColor: 'grey',
        flex: 1,
    },
    fullPage: {
        backgroundColor: 'rgba(249, 217, 250, 1)',
        height: '100%',
    },
    prompt: {
        backgroundColor: 'rgba(249, 217, 250, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    promptText: {
        fontSize: 20,
    },
    button: {
        padding: 8,
        margin: 5,
        backgroundColor: 'rgba(107, 69, 150, 1)',
        borderRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default function Friends({ route, navigation }) {
    const { userID } = route.params;
    console.log("USER ID FROM FRIENDS: " + userID);
    const [friends, setFriends] = useState([]);
    const [searchFailed, updateStatus] = useState(false);
    const [newFriendName, setNewFriendName] = useState('');

    const fetchFriendsList = async () => {
        try {
            const response = await axios.post('https://sea-turtle-app-t57fm.ondigitalocean.app/friendsList', { userId: userID });
            setFriends(response.data.friends);
            updateStatus(false);
        } catch (error) {
            console.error('Error fetching friends list:', error);
            updateStatus(true);
        }
    };

    useEffect(() => {
        fetchFriendsList();
    }, [userID]);

    const friendSearch = (text) => {
        const filteredFriends = friends.filter(friend => friend.username.toLowerCase().includes(text.toLowerCase()));
        setFriends(filteredFriends);
        setNewFriendName(text); // Update newFriendName with the text from the search
    }

    const addFriend = async () => {
      try {
          console.log("Adding friend:", newFriendName, "for userID:", userID); // Debug statement for adding friend
          const response = await axios.post('https://sea-turtle-app-t57fm.ondigitalocean.app/addFriend', {
              userName: newFriendName,
              userId: userID,
          });
          console.log("Add friend response:", response.data.message); // Debug statement for add friend response
          fetchFriendsList();
      } catch (error) {
          console.error('Error adding friend:', error);
      }
  };
  

    console.log("Current Friends List:", friends);

    return (
        <View style={styles.fullPage}>
            <View style={styles.friendParse}>
                <TextInput
                    placeholder='Search for friends...'
                    style={styles.search}
                    onChangeText={friendSearch}
                />
                <TouchableOpacity style={styles.button} onPress={addFriend}>
                    <Text style={styles.buttonText}>Add Friend</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.list}>
                {friends.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.entry}>
                        <View style={styles.pfpContainer}>
                            <Text style={styles.photo}>{item.username.charAt(0)}</Text>
                        </View>
                        <Text style={styles.text}>{item.username}</Text>
                    </TouchableOpacity>
                ))}
                {searchFailed && (
                    <View style={styles.prompt}>
                        <Text style={styles.promptText}>You don't know anyone by that name yet...</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Add new friend</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
