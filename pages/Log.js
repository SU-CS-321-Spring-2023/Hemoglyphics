import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

export default function Log({ navigation }) {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);

  

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    if (!selectedDates.includes(selectedDate)) {
      setSelectedDates(prevSelectedDates => [...prevSelectedDates, selectedDate]);
      // Mark the selected date with custom styling
      setMarkedDates(prevMarkedDates => ({
        ...prevMarkedDates,
        [selectedDate]: { selected: true, marked: true, dotColor: 'red' }
      }));
    } else {
      // Optionally provide feedback if the date is already selected
      Alert.alert('Date already selected', 'Please choose a different date.');
    }
  };
  
  

  const handleLogPeriod = () => {
    if (selectedDates.length === 0) {
      Alert.alert('No dates selected', 'Please select at least one date to log.');
      return;
    }

    const updatedMarkedDates = {};
    selectedDates.forEach(date => {
      updatedMarkedDates[date] = { selected: true, marked: true, dotColor: 'red' };
    });
    setMarkedDates(updatedMarkedDates);
    console.log('Selected dates:', selectedDates);
  };

  const handleClearSelection = () => {
    setSelectedDates([]);
    setMarkedDates({});
  };

  const handleSymptomsButton = () => {
    navigation.navigate('Symptoms'); 
  };

  return (
    <View style={styles.appContainer}>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress} 
        style={{
          height: 400,
          width: 350,
          backgroundColor: 'rgba(249, 217, 250, 1)',
        }} 
        theme={{
          backgroundColor: 'white',
          calendarBackground: 'rgba(249, 217, 250, 1)',
          textSectionTitleColor: 'black',
          selectedDayBackgroundColor: 'blue',
          selectedDayTextColor: 'white',
          todayTextColor: 'blue',
          dayTextColor: 'black',
          textDisabledColor: 'gray',
          dotColor: 'blue',
        }}
      />
      <TouchableOpacity onPress={handleLogPeriod} style={styles.logButton}>
        <Text style={styles.logButtonText}>Log Period</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClearSelection} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear Selection</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSymptomsButton} style={styles.sympButton}>
        <Text style={styles.sympButtonText}>Log Symptoms</Text>
      </TouchableOpacity>
    </View>
  );  
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 217, 250, 1)',
  },
  logButton: {
    width: '60%', // or any other value
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(107, 69, 150, .6)',
    borderRadius: 10,
    bottom: -70,
    
  },
  logButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clearButton: {
    width: '85%', // or any other value
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(107, 69, 150, .8)',
    borderRadius: 10,
    bottom: -70,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sympButton: {
    width: '100%',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(107, 69, 150, 1)',
    borderRadius: 10,
    bottom: -70,
  },
  sympButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});