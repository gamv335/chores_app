// AddChoreScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App'; // Import your RootStackParamList type

// Define props for AddChoreScreen using NativeStackScreenProps
type AddChoreScreenProps = NativeStackScreenProps<RootStackParamList, 'AddChore'>;

const AddChoreScreen = ({ navigation, route }: AddChoreScreenProps) => {
  const [choreTitle, setChoreTitle] = useState('');
  const [choreDescription, setChoreDescription] = useState('');

  // Safely access route.params with a type guard
  const addChore = route.params?.addChore || (() => {});

  const handleSubmit = () => {
    if (choreTitle.trim() !== '') {
      addChore({ title: choreTitle, description: choreDescription });
      navigation.goBack(); // Return to the home screen
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Add New Chore</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        placeholder="Enter chore title"
        value={choreTitle}
        onChangeText={setChoreTitle}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        placeholder="Enter description (optional)"
        value={choreDescription}
        onChangeText={setChoreDescription}
      />
      <Button title="Submit Chore" onPress={handleSubmit} />
    </View>
  );
};

export default AddChoreScreen;
