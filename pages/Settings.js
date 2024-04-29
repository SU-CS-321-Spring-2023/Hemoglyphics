import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Easing, Animated, Dimensions } from 'react-native';

const UserSettingsPage = ({ route }) => {
  const [userId, setUserId] = useState(route.params.userId);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [locationPublic, setLocationPublic] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  console.log(userId);
  const [maskedUserId, setMaskedUserId] = useState('*********');
  const [circlePosition, setCirclePosition] = useState(new Animated.Value(0));

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = () => {
    axios.post('https://sea-turtle-app-t57fm.ondigitalocean.app/getSettings', { userId })
      .then(response => {
        const settingsData = response.data;
        console.log('Settings data:', settingsData);
        setFirstName(settingsData.firstName);
        setLastName(settingsData.lastName);
        setLocationPublic(settingsData.locationPublic);
        setBirthDate(settingsData.birthDate);
        setEmail(settingsData.email);
        setUsername(settingsData.username);
      })
      .catch(error => {
        console.error('Error fetching settings:', error);
      });
  };

  const handleSave = () => {
    const updatedSettings = {
      firstName,
      lastName,
      locationPublic,
      birthDate,
      email,
      username,
    };

    axios.post('https://sea-turtle-app-t57fm.ondigitalocean.app/setSettings', {
      userId,
      settings: updatedSettings,
    })
      .then(response => {
        console.log('Settings updated successfully:', response.data);
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error updating settings:', error);
      });
  };

  const formatBirthDate = (text) => {
    // If the input length is greater than 5, return only the first 5 characters
    if (text.length > 5) {
      return text.slice(0, 5);
    }
    // If the input length is greater than 2 and the last character is not a slash, insert a slash after the second character
    else if (text.length > 2 && text.charAt(2) !== '/') {
      return text.slice(0, 2) + '/' + text.slice(2);
    }
    return text;
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
    <View style={styles.container}>

    <View style={styles.circle}>
        <Animated.View style={[styles.circle2, { top: circle2Position }]} />
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>First Name:</Text>
          <Text style={styles.settingValue}>{firstName}</Text>
          {editMode && (
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              value={firstName}
              onChangeText={setFirstName}
            />
          )}
        </View>

          <View style={styles.divider} />

        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>Last Name:</Text>
          <Text style={styles.settingValue}>{lastName}</Text>
          {editMode && (
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              value={lastName}
              onChangeText={setLastName}
            />
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>Email:</Text>
          <Text style={styles.settingValue}>{email}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>Location Public:</Text>
          <Text style={styles.settingValue}>{locationPublic ? 'Yes' : 'No'}</Text>
          {editMode && (
            <Switch
              value={locationPublic}
              onValueChange={setLocationPublic}
            />
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>Birth Date:</Text>
          <Text style={styles.settingValue}>{birthDate}</Text>
          {editMode && (
            <TextInput
              style={styles.input}
              placeholder="MM/DD"
              value={birthDate}
              onChangeText={(text) => setBirthDate(formatBirthDate(text))}
              maxLength={5}
            />
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>Username:</Text>
          <Text style={styles.settingValue}>{username}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>User ID:</Text>
          <Text style={styles.settingValue}>{editMode ? userId : maskedUserId}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {editMode ? (
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => setEditMode(true)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {},
  circle2: {
    width: 410,
    height: 400,
    marginTop: 700,
    borderRadius: 1000,
    backgroundColor: '#6b4596',
    borderColor: 'white',
    borderWidth: 4,
    position: 'absolute',
    left: (Dimensions.get('window').width - 616) ,
  },

  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 217, 250, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsContainer: {
    width: '90%',
    backgroundColor: 'rgba(107, 69, 150, 0.1)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 100,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 18,
  },
  settingValue: {
    flex: 1,
    fontSize: 18,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#6b4596',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(107, 69, 150, 0.2)',
    marginBottom: 10,
  },
});

export default UserSettingsPage;
