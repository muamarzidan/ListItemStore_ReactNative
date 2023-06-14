import { View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ButtonAdmin } from '../components/button';
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
      'Yakin akan logout? Nama toko, Admin, dan password akan terhapus. Anda harus daftar ulang lagi',
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
            await AsyncStorage.removeItem('namaToko');
            navigation.navigate('loginPage');
          },
        },
      ],
    );
  };
  

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Selamat datang di Dashboard Toko {namaToko}</Text>
        <View style={{width: 280, flexDirection: 'row', justifyContent: 'space-between', borderColor: 'red', borderWidth: 1, marginTop: 20}}>
          <ButtonAdmin jc='center' AlIt='center' bc='#54B435' wdth={120} hght={120} pd={10} br={10}
            gotoPage={() => {
              navigation.navigate('createPage');
            }}>
            Tambah Data
          </ButtonAdmin>
          <ButtonAdmin jc='center' AlIt='center' bc='#00235B' wdth={120} hght={120} pd={10} br={10}
            gotoPage={() => {
              navigation.navigate('updatePage');
            }}>
            Update Data
          </ButtonAdmin>
        </View>
        <View style={{width: 280, flexDirection: 'row', justifyContent: 'space-between', borderColor: 'red', borderWidth: 1, marginTop: 20}}>
          <ButtonAdmin jc='center' AlIt='center' bc='#7E1717' wdth={120} hght={120} pd={10} br={10}
            gotoPage={() => {
              navigation.navigate('searchPage');
            }}>
            Cari Data
          </ButtonAdmin>
          <ButtonAdmin jc='center' AlIt='center' bc='#E21818' wdth={120} hght={120} pd={10} br={10}
            gotoPage={() => {
              navigation.navigate('deletePage');
            }}>
            Hapus Data
          </ButtonAdmin>
        </View>

        <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
          <Text style={{fontSize: 16, textAlign: 'center', color: 'white'}}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonHome} onPress={()=> navigation.navigate ('indexPage')}>
          <Text style={{fontSize: 16, textAlign: 'center', color: 'white'}}>Home</Text>
        </TouchableOpacity>
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
    borderColor: 'red',
    borderWidth: 1,
  },
  welcomeText: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#068DA9',
    padding: 10,
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  buttonLogout: {
    marginTop: 30,
    justifyContent: 'center',
    backgroundColor: '#068DA9',
    padding: 10,
    width: 280,
    height: 45,
    borderRadius: 5,
  },
  buttonHome: {
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: '#068DA9',
    padding: 10,
    width: 280,
    height: 45,
    borderRadius: 5,
  }
});
