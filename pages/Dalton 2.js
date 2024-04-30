import React, {useState, useEffect } from 'react';
import {Image, StyleSheet, ScrollView, TextInput, View, Text } from 'react-native';

export default function Dalton() {
    // Dalton's reply
    const [response, setResponse] = useState('')
    // User question
    const [q, setQ] = useState('');
    // If Dalton is creating content
    const [generating, setGenerating] = useState(false)
    // If the user has not yet prompted Dalton
    const [tutorial, showTutorial] = useState(true)
    
    // User hits enter and sends prompt to Dalton
    const handleQuestion= async ()  => {
        console.log(q); 
        setGenerating(true)
        showTutorial(false)
        // Send user question to Dalton, get response
        const response = await fetch('http://10.0.2.2:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: q }),
        });
        const data = await response.json();
        setGenerating(false)
        // Update state to display response in app
        setResponse(data.result);
        console.log(data)
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'rgba(249, 217, 250, 1)',
            flex: 1,
        },

        searchBar: {
            backgroundColor: 'white',
            borderWidth: 2,
            borderRadius: 2,
            borderColor: 'rgba(107, 69, 150, 1)',
            padding: 3,
            margin: 3
        },

        output: {
            margin: 10,
            borderWidth: 2,
            borderRadius: 2,
            borderColor: 'rgba(107, 69, 150, 1)',
            backgroundColor: 'white',
            padding: 8,
        },

        wait:{
            flex: 1,
            justifyContent: 'center',
            alignItems:'center', 
        },

        waitText:{
            color: 'blue',
            fontSize: 20,
        },

        tutorialBox:{
            margin: 20,
            borderWidth: 2,
            borderRadius: 2,
            backgroundColor: 'white',
            borderColor: 'rgba(107, 69, 150, 1)',
            padding: 4, 
        },

        tutorialTitle:{
            fontSize: 20,
            color: 'grey',
        },

        tutorialText:{
            color: 'grey',
            fontSize: 16,
            margin: 5,
            marginLeft: 15
        },

        daltonAnnouncer:{
            fontSize: 20,
            marginBottom: 8,
        },

        daltonOutput: {
            fontSize: 16,
        }
         

    });


    return (
    <View style={styles.container}> 
        <View>
            <TextInput style={styles.searchBar} value={q} onChangeText={setQ} placeholder="  How can Dalton help?" onSubmitEditing={handleQuestion}/>
        </View>
        <ScrollView> 
        {tutorial &&
            <View style={styles.tutorialBox}>
                <Text style={styles.tutorialTitle}> Who is Dalton? </Text>
                <Text style={styles.tutorialText}>Dalton is an AI assitant who will generate information for you based off of your questions. He has been trained on all things menstrual cycle. This isn't as much like a chat, as much as it is like a google search. Just type your question in the box above and go!</Text>
            </View>
        }
        {generating &&
            <View style={styles.wait}>
                <Text style={styles.waitText}> We are generating a response, please wait. </Text>
            </View>
        }
        {(!generating && !tutorial) &&
            <View style={styles.output}>
                <Text style={styles.daltonAnnouncer}>Dalton says... </Text>
                <Text style={styles.daltonOutput}>{response} </Text>
            </View>
        }
        </ScrollView>
    </View>
    )
}   
