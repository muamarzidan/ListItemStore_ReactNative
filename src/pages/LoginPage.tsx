import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';


interface AppProps {
  navigation: NavigationProp<any>;
}

export default function LoginPage({ navigation }: AppProps) {
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Proses login admin
    console.log('Admin Name:', adminName);
    console.log('Password:', password);
  };

  const handleRegister = () => {
    navigation.navigate('daftarPage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Admin"
        onChangeText={setAdminName}
        value={adminName}
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
  registerText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
