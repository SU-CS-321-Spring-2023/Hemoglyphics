import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const HomeScreen = ({ route, navigation }) => {
  const { userID } = route.params
  console.log("USER ID FROM HOME SCREEN " + userID)
  const [circlePositions] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]);

  const [spinAnimation] = useState(new Animated.Value(0)); // Animation for spinning motion

  useEffect(() => {
    moveCircles();
  }, []);

  const Circle = ({ circleStyle, text, onPress, backgroundColor, index }) => {
    const circleTransform = circlePositions[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 30],
    });

    return (
      <TouchableOpacity onPress={onPress} style={[styles.circle, circleStyle, { backgroundColor, transform: [{ translateY: circleTransform }] }]}>
        <Text style={styles.circleText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const moveCircles = () => {
    circlePositions.forEach((position, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(position, {
            toValue: 1,
            duration: 5000 + index * 500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(position, {
            toValue: 0,
            duration: 5000 + index * 500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  };

  const handleSettingsPress = () => {
    // Perform spinning animation
    Animated.sequence([
      Animated.timing(spinAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(spinAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to settings screen after animation completes
      navigation.navigate('Settings');
    });
  };

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.appContainer}>
      <TouchableOpacity  onPress={() => navigation.navigate('Dalton')} style={styles.dalton}>
            <Text style={styles.buttonText}>🤖</Text>
      </TouchableOpacity> 
      <Circle circleStyle={{ top: '5%', right: 40, elevation: 5 }} text="Maps" onPress={() => navigation.navigate('Maps', { userID : userID })} backgroundColor="rgba(107, 69, 150, 1)" index={0} />
      <Circle circleStyle={{ top: '20%', left: 40, elevation: 5 }} text="Friends" onPress={() => navigation.navigate('Friends List', { userID : userID })} backgroundColor="rgba(107, 69, 150, 1)" index={1} />
      <Circle circleStyle={{ top: '37%', right: 38, elevation: 5 }} text="Messages" onPress={() => navigation.navigate('MessageList',{ userID : userID })} backgroundColor="rgba(107, 69, 150, 1)" index={2} />
      <Circle circleStyle={{ top: '51%', left: 29, elevation: 5 }} text="Circle" onPress={() => navigation.navigate('Circle', {userID: userID })} backgroundColor="rgba(107, 69, 150, 1)" index={3} />
      <Circle circleStyle={{ top: '66%', right: 46, elevation: 5 }} text="Log" onPress={() => navigation.navigate('Log', { userID : userID })} backgroundColor="rgba(107, 69, 150, 1)" index={4} />
      
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <FontAwesomeIcon icon={faGear} size={40} style={{ color: "rgba(107, 69, 150, 1)" }} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
   dalton: {
      zIndex: 5,
      bottom : '40%',
      right: '40%',
      backgroundColor: 'rgba(107, 69, 150, 1)',
      padding: 10,
      borderRadius: 190/2
  },

  buttonText: {
      fontSize: 20,
  },

  settingsButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 10,
    borderRadius: 50,
  },

  appContainer: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 217, 250, 1)',
  },
  circle: {
    borderWidth: 2,
    borderColor: 'pink',
    width: 190,
    height: 190,
    borderRadius: 190 / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeScreen;
