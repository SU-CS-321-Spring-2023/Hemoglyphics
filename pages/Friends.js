import Axios from "axios";
import React, { useState, useEffect} from 'react';
import { TouchableOpacity, TextInput, StyleSheet, Text, View , FlatList, ScrollView, Button, Alert} from 'react-native';


const styles = StyleSheet.create({
    list:{
    },

    text:{
        marginLeft: 30,
        fontSize: 16,
    },

    entry:{
        flexDirection: 'row',
        padding: 20,
        marginTop: 3,
        marginBottom: 3,
        backgroundColor: 'white',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'rgba(107, 69, 150, 1)'
    },

    pfpContainer:{
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 60,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },

    photo:{
        fontSize: 30,
    },

    friendParse:{
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
        flex: 1
    },

    promptText: {
        fontSize: 20,
    },
   
    button:{
        padding: 8,
        margin: 5,
        backgroundColor: 'rgba(107, 69, 150, 1)',
        borderRadius: 3,
    },

    buttonText:{
        color: 'white',
        fontSize: 16
    }
})

export default function Friends({route,navigation,NewCircleScreen,ManageCircleScreen,Circle,Maps,Login,Registration,Log,Message_Board,Messages,NewCircle,ManageCircle}) {
  const [friends, setFriends] = useState([]);
  const [searchFailed, setSearchFailed] = useState(false);
  const [friendName, setFriendName] = useState('');
  const { userID } = route.params;
  console.log("USER ID FROM FRIENDS: " + userID)

  const addFriend = async () => {
    try {
      await Axios.post('https://sea-turtle-app-t57fm.ondigitalocean.app/addFriend', {
        userId: '1',
        userName: friendName,
      });
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await Axios.post('https://sea-turtle-app-t57fm.ondigitalocean.app/friendsList', {
          userId: '1'
        });
        setFriends(response.data.friends);
      } catch (error) {
        setSearchFailed(true);
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  const friendSearch = (text) => {
    const filteredFriends = friends.filter(friend => friend.userName && friend.userName.toLowerCase().includes(text.toLowerCase()));
    setFriends(filteredFriends);
  };

  return (
    <View style={styles.fullPage}>
      <View style={styles.friendParse}>
        <TextInput
          placeholder='Search for friends...'
          style={styles.search}
          onChangeText={setFriendName}
        />
        <TouchableOpacity style={styles.button} onPress={addFriend}>
          <Text style={styles.buttonText}>Add Friend</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.list}>
        {friends.map((item) => (
          <TouchableOpacity key={item.id} style={styles.entry}>
            <View style={styles.pfpContainer}>
              <Text style={styles.photo}>{item.userName ? item.userName.charAt(0) : ''}</Text>
            </View>
            <Text style={styles.text}>{item.userName || ''}</Text>
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
};
