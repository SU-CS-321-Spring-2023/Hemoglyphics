import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Modal, Animated, Easing, Dimensions } from 'react-native';

export default function Message_Board({route}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sortByModalVisible, setSortByModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState('Oldest');
  const [circlePosition, setCirclePosition] = useState(new Animated.Value(0));
  const [expandedMessageIndex, setExpandedMessageIndex] = useState(-1);
  const [replyBoxIndex, setReplyBoxIndex] = useState(-1);
  const [replyMessage, setReplyMessage] = useState('');
  const [likeCounts, setLikeCounts] = useState(Array(messages.length).fill(0));

  useEffect(() => {
    //Test data
    const dummyMessages = [
      { text: "Hello", username: "User1", time: "9:00 AM" },
      { text: "How are you?", username: "User2", time: "9:05 AM" }
    ];
    setMessages(dummyMessages);
  }, []);

  useEffect(() => {
    moveCircles();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString();
      const newMessageObj = {
        text: newMessage,
        username: "Username", 
        time: currentTime
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  const toggleExpandedMessage = (index) => {
    if (expandedMessageIndex === index) {
      setExpandedMessageIndex(-1);
      setReplyBoxIndex(-1);
    } else {
      setExpandedMessageIndex(index);
    }
  };

  const toggleReplyBox = (index) => {
    setReplyBoxIndex(index === replyBoxIndex ? -1 : index);
    if (replyBoxIndex === index) {
      setReplyBoxIndex(-1);
    } else {
      setReplyBoxIndex(index);
    }
  };

  const handleReplyChange = (text) => {
    setReplyMessage(text);
  };

  const handleSendReply = () => {
    if (replyMessage.trim() !== '') {
      // Handle sending reply logic here
      console.log("Reply message:", replyMessage);
      setReplyMessage('');
      setReplyBoxIndex(-1);
    }
  };

  const handleLike = (index) => {
    const newLikeCounts = [...likeCounts];
    newLikeCounts[index] += 1;
    setLikeCounts(newLikeCounts);
    console.log(`Message at index ${index} liked`);
  };

  const handleSortOption = (option) => {
    setSortBy(option);
    setSortByModalVisible(false);
    // Implement sorting logic based on selected option
    // For now, we'll just log the selected option
    console.log(`Sorted by ${option}`);
  };

  const moveCircles = () => {
    Animated.sequence([
      Animated.timing(circlePosition, {
        toValue: 1, // End value
        duration: 3000, // Duration of the animation
        easing: Easing.bounce, // Bounce effect
        useNativeDriver: false, // Required for animations not supported by native driver
      })
    ]).start(); // Start the animation
  };

  const circle2Position = circlePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [500, -220], 
  });



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle2, { top: circle2Position }]} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Message Board</Text>
      </View>

      <View style={styles.sortContainer}>
        <Text>Sort by:</Text>
        <TouchableOpacity onPress={() => setSortByModalVisible(true)}>
          <Text>{sortBy}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.backgroundContainer}>
      <View style={styles.bubbleContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
          {messages.map((message, index) => (
            <TouchableOpacity key={index} onPress={() => toggleExpandedMessage(index)}>
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{message.username} - {message.time}</Text>
                <Text style={styles.messageText}>{message.text}</Text>
                <View style={styles.interactionContainer}>
                  <TouchableOpacity onPress={() => handleLike(index)}>
                    <Text style={styles.likeButton}>Like</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleReplyBox(index)}>
                  <View style={styles.ReplyContainer}>
                    <Text>Reply</Text>
                  </View>
                   </TouchableOpacity>

                </View>
                {expandedMessageIndex === index && (
                  <View style={styles.expandedContent}>
                    {replyBoxIndex === index && (
                      <View style={styles.replyBox}>
                        <TextInput
                          style={styles.replyInput}
                          placeholder="Type your reply here"
                          value={replyMessage}
                          onChangeText={handleReplyChange}
                        />
                        <TouchableOpacity style={styles.sendReplyButton} onPress={handleSendReply}>
                          <Text style={styles.sendReplyButtonText}>Reply</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    {/* Display reply message if it exists */}
                    {message.reply && (
                      <View style={styles.ReplyContainer}>
                        <Text style={styles.replyInput}>{message.reply}</Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>
        
      
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={sortByModalVisible}
        onRequestClose={() => setSortByModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Select Sorting Option</Text>
            <TouchableOpacity style={styles.sortOption} onPress={() => handleSortOption('Oldest')}>
              <Text>Oldest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortOption} onPress={() => handleSortOption('Newest')}>
              <Text>Newest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circle2: {
    width: 410,
    height: 400,
    borderRadius: 1000,
    backgroundColor: '#6b4596',
    borderColor: 'white',
    borderWidth: 4,
    position: 'absolute',
    left: (Dimensions.get('window').width - 410) / 2,
  },
  circleContainer: {
    position: 'relative',
  },
  

  likeButton: {
    color: '#6b4596',
    fontWeight: 'bold',
    marginRight: 10,
  },
  interactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 217, 250, 1)',
  },
  scrollViewContent: {
    flexGrow: 1,
    marginBottom: 100, 
    paddingBottom: 70, 
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    color: '#bc8da0',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  bubbleContainer: {
    paddingHorizontal: 10,
    marginBottom: -190,
  },
  messageBubble: {
    backgroundColor: 'rgba(107, 69, 150, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  expandedContent: {
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  ReplyContainer: {
    backgroundColor: 'rgba(107, 69, 150, 0.1)',
    padding: 10,
    borderRadius: 10,
  },
  replyBox: {
    backgroundColor: 'rgba(107, 69, 150, 0.1)',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  replyInput: {
    borderWidth: 1,
    borderColor: 'rgba(107, 69, 150, 0.5)',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  sendReplyButton: {
    backgroundColor: '#6b4596',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendReplyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backgroundContainer: {
    margin: 20,
    marginTop: 110,
    paddingBottom: 300,
    paddingVertical: 10,
    width: '90%',
    backgroundColor: 'rgba(107, 69, 150, 0.1)',
    borderRadius: 10,
    shadowColor: 'rgb(107, 69, 150)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.8,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'rgba(249, 217, 250, 1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(107, 69, 150, 0.5)',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(107, 69, 150, 0.5)',
    backgroundColor: 'rgba(107, 69, 150, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#6b4596',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  sortOption: {
    marginVertical: 10,
  }
});
