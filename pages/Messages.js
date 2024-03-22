import React, { useState, useEffect } from 'react';
import { Animated, Easing, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function MessagesScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [circlePosition, setCirclePosition] = useState(new Animated.Value(0));

  useEffect(() => {
    moveCircles();
  }, []);

  const moveCircles = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(circlePosition, {
          toValue: 1,
          duration: 5000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(circlePosition, {
          toValue: 0,
          duration: 5000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: new Date().getTime(), text: message }]);
      setMessage('');
    }
  };

  const circle1Transform = circlePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50], 
  });

  const circle2Transform = circlePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50], 
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.circle, { transform: [{ translateY: circle1Transform }] }]} />
      <Animated.View style={[styles.circle2, { transform: [{ translateY: circle2Transform }] }]} />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Message Board')} style={styles.messageBoardNav}> 
            <Text style={styles.navText} >Go to Message Board</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View key={msg.id} style={styles.messageBubble}>
            <Text>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 230, 250, 1)', 
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: '#6b4596',
    position: 'absolute',
    left: -100,
    top: -100,
  },
  circle2: {
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'white',
    position: 'absolute',
    right: -50,
    bottom: -50,
    borderWidth: 10,
    borderColor: 'pink',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: 'white',
     
  },
  messagesContainer: {
    flex: 1,
  },
  messageBubble: {
    margin: 12, 
    padding: 12, 
    backgroundColor: 'white',
    borderRadius: 15, 
    shadowColor: '#6b4596',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 12, 
    backgroundColor: 'white',
    borderRadius: 15, 
    borderWidth: 1,
    borderColor: '#ccc', 
  },
  sendButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#8a4baf', 
    borderRadius: 15, 
    elevation: 2, 
    shadowOpacity: 0.3, 
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageBoardNav: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgba(107, 69, 150, 1)',
    padding: 8,
    marginLeft: 2,
    marginRight: 2,
  },
  navText: {
    color: 'black',
  }
});

