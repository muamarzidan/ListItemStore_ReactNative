import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; 4


interface AppProps {
  navigation: NavigationProp<any>;
}

export default function LoginPage({ navigation }: AppProps) {
  const [namaToko, setNamaToko] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const handleLogin = async () => {
    const storedNamaToko = await AsyncStorage.getItem('namaToko');
    const storedPassword = await AsyncStorage.getItem('password');

    if (namaToko === storedNamaToko && password === storedPassword) {
      navigation.navigate('dashboardPage');
    } else if (namaToko === '' || password === '') {
      Alert.alert('Harap isi form yang kosong terlebih dahulu')
    } else {
      Alert.alert('Nama toko atau password yang anda masukan salah');
    }
  };

  const handleRegister = () => {
    navigation.navigate('registerPage');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.namaInput}
        placeholder="Nama Toko"
        onChangeText={setNamaToko}
        value={namaToko}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.passwordIcon} onPress={toggleShowPassword}>
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="black" />
        </TouchableOpacity>
      </View>

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
  namaInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 1,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
  },
  passwordIcon: {
    marginRight: 15,
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
