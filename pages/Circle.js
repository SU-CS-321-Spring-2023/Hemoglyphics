import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Circle({ navigation }) {
  return (
    <View style={styles.appContainer}>
      <Text>circles :)</Text>
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
});
