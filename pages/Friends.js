import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, StyleSheet, Text, View , FlatList, ScrollView, Button} from 'react-native';


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


//export default function Friends({navigation, NewCircleScreen, ManageCircleScreen, Circle, Maps, Login, Registration, Log, Message_Board, Messages, NewCircle, ManageCircle,}) {
    
    // list of friends (placeholder values)
   export const allFriends = [
        {name: "Philis",pfp: "☺️", id: 0},
        {name: "George", pfp: "🦊", id: 1},
        {name: "Lord Farquaad", pfp:"🥸", id: 2},
        {name: "Darth Vader", pfp:"😡", id: 3},
        {name: "Solid Snake", pfp:"🥹", id: 4},
        {name: "Mary", pfp:"😎", id: 5},
        {name: "George 2", pfp:"🤠", id: 6},
        {name: "Peter Griffin", pfp:"😸", id: 7},
        {name: "TJ", pfp:"😱", id: 8},
        {name: "Help I am tired of coming up with names", pfp:"🗿", id: 9},
        {name: "Lord Cornwalis XIV", pfp:"🤩", id: 10},
        {name: "The Target Dog", pfp:"🐶", id: 11},
        {name: "George 4", pfp:"👽", id: 12},
        {name: "I am done now.", pfp:"👺", id: 13},
    ];
    
    

    export default function Friends({ navigation, NewCircleScreen, ManageCircleScreen, Circle, Maps, Login, Registration, Log, Message_Board, Messages, NewCircle, ManageCircle }) {
        const [friends, setFriends] = useState(allFriends);
        const [searchFailed, updateStatus] = useState(false);


    // update the list to make sure the search didn't fail as soon as there is a change in friends
    useEffect(() => {
        if(friends.length === 0){
            updateStatus(true);
        }
        else if(friends.length != 0 && searchFailed){
            updateStatus(false);
        }
    }, [friends])
    
    //function to search friends list
    const friendSearch = (text) => {
        setFriends(friends => allFriends.filter(friend => friend.name.substring(0, text.length).toLowerCase() === text.toLowerCase()));
    }

    // render every friend on your list
    return (
        <View style={styles.fullPage}> 
            <View style={styles.friendParse}>
                <TextInput placeholder= 'Search for friends...' style={styles.search} onChangeText={friendSearch}/>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add Friend</Text>
                </TouchableOpacity>
            </View>
                <ScrollView style={styles.list}>
                    {friends.map((item) => {
                        return(
                            <TouchableOpacity key={item.id} style={styles.entry}> 
                                <View style={styles.pfpContainer}>
                                    <Text style={styles.photo}>{item.pfp}</Text>
                                </View>
                                <Text style={styles.text}>{item.name}</Text>
                            </TouchableOpacity> 
                        );
                       }
                    )}
                    { searchFailed && ( 
                            <View style={styles.prompt}> 
                                <Text style={styles.promptText}> You don't know anyone by that name yet... </Text>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Add new friend</Text>
                                    
                                </TouchableOpacity>
                            </View>
                        )}
                </ScrollView>
        </View>


    );
};
