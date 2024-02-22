import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Log({ navigation }) {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);
  const [logButtonClicked, setLogButtonClicked] = useState(false);

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    setSelectedDates(prevSelectedDates => [...prevSelectedDates, selectedDate]);
  };

  const handleLogPeriod = () => {
    const updatedMarkedDates = {};
    selectedDates.forEach(date => {
      updatedMarkedDates[date] = { selected: true, marked: true, dotColor: 'red' };
    });
    setMarkedDates(updatedMarkedDates);
    setLogButtonClicked(true);
    console.log('Selected dates:', selectedDates);
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
          calendarBackground: 'white',
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
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  logButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});






