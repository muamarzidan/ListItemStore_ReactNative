import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

interface AppProps {
  navigation: NavigationProp<any>;
}

export default function RegisterPage({ navigation }: AppProps) {
  const [namaToko, setNamaToko] = useState('');
  const [namaAdmin, setNamaAdmin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (namaToko === '' || namaAdmin === '' || password === '') {
      Alert.alert('Harap isi form yang kosong terlebih dahulu');
      return;
    }
    AsyncStorage.setItem('namaToko', namaToko);
    AsyncStorage.setItem('namaAdmin', namaAdmin);
    AsyncStorage.setItem('password', password);

    // Then return to the dashboard page
    navigation.navigate('dashboardPage');
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
        onChangeText={setNamaToko}
        value={namaToko}
      />

      <TextInput
        style={styles.input}
        placeholder="Nama Admin"
        onChangeText={setNamaAdmin}
        value={namaAdmin}
      />

      <View style={styles.passwordInput}>
        <TextInput
          style={styles.passwordField}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="gray" />
        </TouchableOpacity>
      </View>

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
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  passwordField: {
    flex: 1,
  },
  eyeIcon: {
    padding: 5,
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
  },
});
