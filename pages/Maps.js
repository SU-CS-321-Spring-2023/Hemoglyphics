import React, { useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'Friend 1', latitude: 37.78825, longitude: -122.4324 },
    { id: 2, name: 'Friend 2', latitude: 37.789, longitude: -122.433 },
    // Add more friends as needed
  ]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  

  const mapRef = useRef(null); // Define ref outside of useState

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  const zoomToFriend = (friend) => {
    setSelectedFriend(friend);
    setModalVisible(false);
    // Implement zooming logic to friend's location here
    // For example, you can set the map region to the friend's location

    // Zoom logic
    const region = {
      latitude: friend.latitude,
      longitude: friend.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current.animateToRegion(region, 1000); // Adjust duration as needed
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} ref={mapRef}>
        {/* User Marker */}
        {userLocation && (
          <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }} />
        )}

        {/* Friends' Markers */}
        {friends.map((friend) => (
  <Marker
    key={friend.id}
    coordinate={{ latitude: friend.latitude, longitude: friend.longitude }}
    onPress={() => zoomToFriend(friend)}
    pinColor="#6b4596" //or #f9d9fa for the pink color
  >
    <Callout>
      <Text>{friend.name}</Text>
    </Callout>
  </Marker>
))}

      </MapView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setSelectedOption('friends')}
            >
              <Text style={styles.optionButtonText}>Show Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setSelectedOption('circle')}
            >
              <Text style={styles.optionButtonText}>Show Circle</Text>
            </TouchableOpacity>

            {selectedOption === 'friends' && (
              <View>
                <Text style={styles.modalTitle}>Friends</Text>
                {friends.map((friend) => (
                  <TouchableOpacity
                    key={friend.id}
                    style={styles.friendItem}
                    onPress={() => zoomToFriend(friend)}
                  >
                    <Text>{friend.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedOption === 'circle' && (
              <View>
                <Text style={styles.modalTitle}>Circle</Text>
                {/* Implement circle logic here */}
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Button to open modal */}
      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7} // Allow interaction with map beneath
      >
        <Text style={styles.modalButtonText}>Choose Option</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  optionButton: {
    marginBottom: 10,
    backgroundColor: '#6b4596',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#6b4596',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MapScreen;
