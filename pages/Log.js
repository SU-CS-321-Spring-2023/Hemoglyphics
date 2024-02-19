import { Text, View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Importing Calendar component

export default function Log({ navigation }) {
  return (
    <View style={styles.appContainer}>
      <Text>Log</Text>
      <Calendar // Adding Calendar component
        // Add any props you need for the Calendar component here
      />
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
