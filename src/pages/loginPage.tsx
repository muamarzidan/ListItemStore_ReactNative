import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppProps {
  navigation: NavigationProp<any>;
}

export default function LoginPage({ navigation }: AppProps) {
  const [namaToko, setNamaToko] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const storedNamaToko = await AsyncStorage.getItem('namaToko');
    const storedPassword = await AsyncStorage.getItem('password');

    if (namaToko === storedNamaToko && password === storedPassword) {
      navigation.navigate('dashboardPage');
    } else {
      Alert.alert('Nama toko atau password salah');
    }
  };

  const handleRegister = () => {
    navigation.navigate('registerPage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Toko"
        onChangeText={setNamaToko}
        value={namaToko}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerText}>Belum punya akun? Daftar disini</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerText: {
    color: 'green',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});
