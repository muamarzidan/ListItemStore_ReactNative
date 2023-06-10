import { View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ButtonNormal from '../components/button';

interface AppProps {
  navigation: NavigationProp<any>;
}

export default function App({ navigation }: AppProps) {
  const [namaToko, setNamaToko] = useState('');

  useEffect(() => {
    getNamaToko();
  }, []);

  const getNamaToko = async () => {
    const storedNamaToko = await AsyncStorage.getItem('namaToko');
    setNamaToko(storedNamaToko || '');
  };

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Yakin akan logout? Nama toko, Admin, dan password akan terhapus. Anda harus daftar ulang',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: async () => {
            await AsyncStorage.removeItem('namaAdmin');
            await AsyncStorage.removeItem('password');
            navigation.navigate('loginPage');
          },
        },
      ],
    );
  };
  

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Selamat datang di Toko {namaToko}</Text>
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
        <ButtonNormal
          onPress={handleLogout}
          title="Logout"
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
    marginTop: 10,
  },
});
