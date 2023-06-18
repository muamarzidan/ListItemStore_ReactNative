import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonNormal from './components/button';

interface AppProps {
  navigation: NavigationProp<any>;
}

export default function App({ navigation }: AppProps) {
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    const storedNamaToko = await AsyncStorage.getItem('namaToko');
    const storedPassword = await AsyncStorage.getItem('password');

    if (storedNamaToko && storedPassword) {
      navigation.navigate('dashboardPage');
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Selamat datang di Toko Anda</Text>
        <ButtonNormal
          onPress={() => navigation.navigate('loginPage')}
          title="Login"
          buttonStyle={styles.button}
        />
        <ButtonNormal
          onPress={() => navigation.navigate('itemPage')}
          title="Cari Barang"
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ECF8F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  welcomeText: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#068DA9',
    padding: 10,
    width: 150,
    borderRadius: 5,
  },
});
