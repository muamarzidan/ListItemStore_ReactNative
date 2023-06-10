import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';


interface AppProps {
  navigation: NavigationProp<any>;
}

export default function RegisterPage({ navigation }: AppProps) {
  const [storeName, setStoreName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Proses pendaftaran admin
    console.log('Store Name:', storeName);
    console.log('Admin Name:', adminName);
    console.log('Password:', password);
  };

  const handleLogin = () => {
    navigation.navigate('loginPage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Toko"
        onChangeText={setStoreName}
        value={storeName}
      />

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

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginText}>Sudah punya akun? Login disini</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Daftar</Text>
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
  registerButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  }
});
