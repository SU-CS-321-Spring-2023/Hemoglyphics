// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import  SymptomModal  from '../components/SymptomsModal.js';



const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [waterIntake, setWaterIntake] = useState(0);
  const buttonsAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(buttonsAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSymptomSelect = async (option) => {
    
    console.log(`You have selected ${option} for ${selectedSymptom}`);
    setModalVisible(false);

    // Prepare the data to send to the server
    console.log(`Option: ${option}`);
    const data = {
      symptoms: option,
    };
    console.log("Data:", data);

    console.log("Sending data to server:", data); // Log the data being sent

    // Send a POST request to the server
    try {
      const response = await axios.post('http://localhost:3000/save-symptoms', data);
      console.log(`Response status: ${response.status} ${response.statusText}`);
      console.log("Response data:", response.data); // Log the response data
    } catch (error) {
      console.error('Error saving symptoms:', error);
    }
  };
  const openModal = (symptom) => {
    setSelectedSymptom(symptom);
    let options = [];

    // Set modal options based on the selected symptom
    switch (symptom) {
      case 'Flow':
        options = ['Super Heavy', 'Heavy', 'Regular', 'Light', 'Super Light', 'Spotting'];
        break;
      case 'Discharge':
        options = ['White', 'Clear/Stretchy', 'Clear/Watery', 'Yellow/Green', 'Brown', 'Sticky', 'Creamy', 'None'];
        break;
      case 'Aches/Pains':
        options = ['Abdominal Pains', 'Hot Flashes', 'Acne', 'Joint Pain', 'Backache', 'Muscle Aches', 'Brest Tenderness', 'Rashes', 'Cold sweats', 'Tinnitus (Ear Ringing)', 'Cramps', 'Vaginal Itching', 'Earache', 'Vaginal Dryness', 'Fatigue', 'Fever', 'Headaches', 'Hives'];
        break;
      case 'Mood':
        options = ['Anxious', 'Apathetic', 'Confused', 'Depressed', 'Energetic', 'Excited', 'Happy', 'Irritated', 'Little Energy', 'Mood Swings', 'Over Thinking', 'Okay', 'Sad'];
        break;
      case 'Digestion':
        options = ['Constipation', 'Diarrhea', 'Gas', 'Nausea', 'Vomiting', 'Bloating', 'Cravings', 'Indigestion', 'Loss of Appetite', 'Stomach Ache', 'Thirsty', 'Upset Stomach'];
        break;
      case 'Stool':
        options = ['Normal', 'Constipation', 'Diarrhea'];
        break;
      default:
        options = [];
    }

    setModalOptions(options);
    setModalVisible(true);
  };

  const increaseWaterIntake = () => {
    setWaterIntake(waterIntake + 1);
  };

  const decreaseWaterIntake = () => {
    setWaterIntake(waterIntake - 1);
  };

  const buttonTransform = buttonsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const waterIcons = Array.from({ length: waterIntake }, (_, index) => (
    <Ionicons key={index} name="water-outline" size={32} color="blue" />
  ));

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View style={[styles.buttonsContainer, { transform: [{ translateY: buttonTransform }] }]}>
        <TouchableOpacity style={styles.button} onPress={() => openModal('Flow')}>
          <Text style={styles.buttonText}>Flow</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => openModal('Discharge')}>
          <Text style={styles.buttonText}>Discharge</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => openModal('Aches/Pains')}>
          <Text style={styles.buttonText}>Aches/Pain</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => openModal('Mood')}>
          <Text style={styles.buttonText}>Mood</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => openModal('Digestion')}>
          <Text style={styles.buttonText}>Digestion</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => openModal('Stool')}>
          <Text style={styles.buttonText}>Stool</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.waterContainer}>
        {/* Text showing water intake */}
        <Text style={styles.waterText}>Water Intake: {waterIntake} glasses</Text>

        {/* Buttons for adding/removing water intake */}
        <TouchableOpacity style={styles.waterButton} onPress={increaseWaterIntake}>
          <Text style={styles.buttonText}>Add Intake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dewaterButton} onPress={() => setWaterIntake(Math.max(0, waterIntake - 1))}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={() => setWaterIntake(0)}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        <Ionicons name="water-outline" size={32} color="purple" />
        {/* Water Icons */}
        {waterIcons}
      </View>

      <SymptomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSymptomSelect}
        symptom={selectedSymptom}
        options={modalOptions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 217, 250, 1)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 15,
  },
  button: {
    backgroundColor: '#bc8da0',
    borderRadius: 50,
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  waterContainer: {
    paddingTop: 20,
    paddingHorizontal: 60,
    paddingVertical:50,
    marginTop: 20,
    transform: [{ translateX: 40 }],
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    boxshadow: '0 0px 10px 0 rgba(0, 0, 0, 0.5)',
  },
  waterText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  waterButton: {
    backgroundColor: '#bc8da0',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dewaterButton: {
    backgroundColor: '#bc8da0',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  resetButton: {
    backgroundColor: '#bc8da0',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingHorizontal: 75,
    paddingVertical:50,
    maxHeight: 250,
    maxWidth: 310,
    marginTop: 20,
    transform: [{ translateX: 40 }],
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    boxshadow: '0 0px 10px 0 rgba(0, 0, 0, 0.5)',
  },
});

export default App;
