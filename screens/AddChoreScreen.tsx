// AddChoreScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import your RootStackParamList type
import { useChores } from '../context/ChoreContext';  // Import the useChores hook
import DateTimePicker from '@react-native-community/datetimepicker';

// Define props for AddChoreScreen using NativeStackScreenProps
type AddChoreScreenProps = NativeStackScreenProps<RootStackParamList, 'AddChore'>;

function AddChoreScreen ({ navigation }: AddChoreScreenProps) {
  const [choreTitle, setChoreTitle] = useState('');
  const [choreDescription, setChoreDescription] = useState('');
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [deadlineTime, setDeadlineTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { addChore } = useChores();  // Retrieve addChore from context

  // Retrieve addChore from the navigation options
  //const addChore = navigation.getState().routes.find(route => route.name === 'HomeScreen')?.params?.addChore;

  // Safely access route.params with a type guard
  //const addChore = route.params?.addChore || (() => {});

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDeadlineDate(selectedDate); // Set the deadline date if one is selected
    }
    setShowDatePicker(true); // Hide the date picker after a date is selected or dismissed
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (selectedTime) {
      setDeadlineTime(selectedTime);
    }
    setShowTimePicker(true);
  };

  const handleSubmit = () => {
    if (choreTitle.trim() !== '') {
      // Combine the selected date and time into one Date object
      const combinedDeadline = new Date(
        deadlineDate.getFullYear(),
        deadlineDate.getMonth(),
        deadlineDate.getDate(),
        deadlineTime.getHours(),
        deadlineTime.getMinutes()
      );

      addChore({
        title: choreTitle,
        description: choreDescription,
        deadlineDate: combinedDeadline.toISOString().split('T')[0],  // YYYY-MM-DD
        deadlineTime: combinedDeadline.toTimeString().split(' ')[0],  // HH:MM:SS
      });

      navigation.goBack();
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
      <Button title="Pick Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={deadlineDate}  // The current selected or initial date
          mode="date"  // Pick a date (you can also use "time" for time picker)
          display="default"
          onChange={handleDateChange}  // When date is picked
        />
      )}
      <Button title="Pick Time" onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          value={deadlineTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}  // Handle time change
        />
      )}
      <Button title="Submit Chore" onPress={handleSubmit} />
    </View>
  );
};

export default AddChoreScreen;
