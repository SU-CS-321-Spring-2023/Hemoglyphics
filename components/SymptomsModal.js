import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons (you may need to install this package)

const SymptomModal = ({ visible, onClose, onSelect, symptom, options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = () => {
    // Pass the selectedOptions to the onSelect prop
    onSelect(selectedOptions);

    // Clear selected options
    setSelectedOptions([]);

    // Close the modal
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{symptom}</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => toggleOption(option)}>
                <Text>{option}</Text>
                {selectedOptions.includes(option) && (
                  <AntDesign name="checkcircle" size={15} color="rgba(0, 0, 0, 0.5)" style={styles.checkmark} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.container}>
            <Text style={styles.selectedOptionsText}>Selected Options:</Text>
            {selectedOptions.map((option, index) => (
              <Text key={index} style={styles.selectedOption}>{option}</Text>
            ))}
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose} >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 130,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  checkmark: {
    marginRight: 'auto', 
  },
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedOptionsText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedOption: {
    marginBottom: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#bc8da0',
  },
  buttonClose: {
    backgroundColor: '#bc8da0',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SymptomModal;
