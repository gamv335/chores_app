/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { useState, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, FlatList, TextInput } from 'react-native';  // TextInput added here
import { registerRootComponent } from 'expo';  
import { NativeStackScreenProps } from '@react-navigation/native-stack';  
import { AuthProvider } from './context/AuthContext'; 
import AddChoreScreen from './screens/AddChoreScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import { ChoreProvider } from './context/ChoreContext';  // Import the ChoreProvider
import { useChores } from './context/ChoreContext';  // Import the useChores hook

// Define the type for the navigation stack
export type RootStackParamList = {
  HomeScreen: undefined;
  AddChore: undefined;  // Now AddChore expects the addChore function
  RegisterScreen: undefined;
  LoginScreen: undefined;
};

// Create a Stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Define props for HomeScreen and AddChoreScreen using NativeStackScreenProps
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
type AddChoreScreenProps = NativeStackScreenProps<RootStackParamList, 'AddChore'>;

export type Chore = {
  title: string;
  description?: string;
};

// HomeScreen to display the list of chores
function HomeScreen({ navigation }: HomeScreenProps) {
  const { chores, setChores } = useChores();   // Retrieve chores from context

  const addChore = (chore: Chore) => {
    setChores([...chores, chore]);
  };

  // useEffect or useLayoutEffect to set the addChore function
  //useLayoutEffect(() => {
  //  navigation.setOptions({
  //    addChore, // Pass the addChore function using navigation.setOptions
  //  });
  //}, [navigation, addChore]);

  const renderItem = ({ item }: { item: Chore }) => (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 18 }}>{item.title}</Text>
      {item.description ? <Text>{item.description}</Text> : null}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Household Chores</Text>

      {/* Display the list of chores */}
      <FlatList
        data={chores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      {/* Button to navigate to a screen for adding new chores */}
      <Button
        title="Add New Chore"
        onPress={() => navigation.navigate('AddChore')}  
      />
    </View>
  );
}

// Main App component
export default function App() {
  return (
    <ChoreProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AddChore" component={AddChoreScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ChoreProvider>
  );
}

// Register the main component (App) with Expo
registerRootComponent(App);  
