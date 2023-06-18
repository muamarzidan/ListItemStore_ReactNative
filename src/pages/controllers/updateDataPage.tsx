import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  updateDataPage: {
    kodeBarang: string;
    namaBarang: string;
    hargaAwal: string;
    hargaJual: string;
  };
};

type UpdateDataPageRouteProp = RouteProp<RootStackParamList, 'updateDataPage'>;
type UpdateDataPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'updateDataPage'>;

type Props = {
  route: UpdateDataPageRouteProp;
  navigation: UpdateDataPageNavigationProp;
};

const UpdateDataPage: React.FC<Props> = ({ route, navigation }) => {
  const { kodeBarang, namaBarang, hargaJual, hargaAwal } = route.params;
  const [updatedKodeBarang, setUpdatedKodeBarang] = useState(kodeBarang);
  const [updatedNamaBarang, setUpdatedNamaBarang] = useState(namaBarang);
  const [updatedHargaJual, setUpdatedHargaJual] = useState(hargaJual);
  const [updatedHargaAwal, setUpdatedHargaAwal] = useState(hargaAwal);

  const handleUpdateData = async () => {
    if (!updatedKodeBarang || !updatedNamaBarang || !updatedHargaJual || !updatedHargaAwal) {
      Alert.alert('Error', 'Semua field harus diisi');
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem('dataBarang');
      const convertData = storedData ? JSON.parse(storedData) : [];

      const updatedData = convertData.map((item: any) => {
        if (item.kodeBarang === kodeBarang) {
          return {
            ...item,
            kodeBarang: updatedKodeBarang,
            namaBarang: updatedNamaBarang,
            hargaAwal: updatedHargaAwal,
            hargaJual: updatedHargaJual,
          };
        }
        return item;
      });

      await AsyncStorage.setItem('dataBarang', JSON.stringify(updatedData));

      Alert.alert('Sukses', 'Data berhasil diperbarui');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat memperbarui data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Data Barang</Text>
      <Text style={styles.label}>Kode Barang</Text>
      <TextInput
        style={styles.input}
        value={updatedKodeBarang}
        onChangeText={setUpdatedKodeBarang}
      />

      <Text style={styles.label}>Nama Barang</Text>
      <TextInput
        style={styles.input}
        value={updatedNamaBarang}
        onChangeText={setUpdatedNamaBarang}
      />

      <Text style={styles.label}>Harga Awal</Text>
      <TextInput
        style={styles.input}
        value={updatedHargaAwal}
        onChangeText={setUpdatedHargaAwal}
      />

      <Text style={styles.label}>Harga Jual</Text>
      <TextInput
        style={styles.input}
        value={updatedHargaJual}
        onChangeText={setUpdatedHargaJual}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateData}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  updateButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UpdateDataPage;
