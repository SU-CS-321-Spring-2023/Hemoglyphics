import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View , FlatList, ScrollView, Button} from 'react-native';

const styles = StyleSheet.create({
    list:{
    },

    text:{
        marginLeft: 30,
        fontSize: 16,
    },

    entry:{
        flexDirection: 'row',
        backgroundColor: 'lavender',
        padding: 30,
        marginTop: 3,
        marginBottom: 3,
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
    }
})

export default function Friends({navigation}) {
    // list of friends (placeholder values)
    const [friends, setFriends] = useState([
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
    ]);
    

    //function to search friends list
    const friendSearch = () => {
       friends.map((item) => { 
            
       }) 
    };
    // render every friend on your list
    return (
        <View> 
            <View style={styles.friendParse}>
                <TextInput placeholder= 'Search for friends...' style={styles.search} onChangeText={friendSearch}/>
                <Button title="add friend" />
            </View>
                <ScrollView style={styles.list}>
                    {friends.map((item) => {
                        return(
                         <View key={item.id} style={styles.entry}> 
                            <View style={styles.pfpContainer}>
                                <Text style={styles.photo}>{item.pfp}</Text>
                            </View>
                            <Text style={styles.text}>{item.name}</Text>
                         </View> 
                        )
                       }
                    )}
                </ScrollView>
        </View>

    );
};
