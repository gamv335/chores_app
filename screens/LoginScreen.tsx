// screens/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import your RootStackParamList

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { login, error, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login button pressed'); // Debugging log
    login(email, password);
  };

  // useEffect to navigate to HomeScreen after user successfully logs in
  useEffect(() => {
    if (user) {
      console.log('User is logged in, navigating to HomeScreen'); // Debugging log
      navigation.navigate('HomeScreen'); // Navigate to HomeScreen when user state is updated
    }
  }, [user, navigation]); // Effect depends on `user` and `navigation`

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('RegisterScreen')}
      />
    </View>
  );
};

export default LoginScreen;
