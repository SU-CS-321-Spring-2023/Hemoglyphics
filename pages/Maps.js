import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Maps({ navigation }) {
    return (
        <View style={styles.container}> 
            <Text style={styles.text}>Coming Soon :) </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(249, 217, 250, 1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40, // You can adjust the size as needed
        textAlign: 'center',
    },
});