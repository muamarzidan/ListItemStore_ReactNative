import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePage = () => {
  const [kodeBarang, setKodeBarang] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [hargaAwal, setHargaAwal] = useState('');
  const [hargaJual, setHargaJual] = useState('');

  const handleInsert = async () => {
    const barang = {
      kodeBarang,
      namaBarang,
      hargaAwal,
      hargaJual,
    };

    const existingData = await AsyncStorage.getItem('dataBarang');
    const dataBarang = existingData ? JSON.parse(existingData) : [];
    dataBarang.push(barang);

    await AsyncStorage.setItem('dataBarang', JSON.stringify(dataBarang));

    setKodeBarang('');
    setNamaBarang('');
    setHargaAwal('');
    setHargaJual('');

    Alert.alert('Data barang berhasil ditambahkan');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Barang</Text>

      <TextInput
        style={styles.input}
        placeholder="Kode Barang"
        onChangeText={setKodeBarang}
        value={kodeBarang}
      />

      <TextInput
        style={styles.input}
        placeholder="Nama Barang"
        onChangeText={setNamaBarang}
        value={namaBarang}
      />

      <TextInput
        style={styles.input}
        placeholder="Harga Awal"
        onChangeText={setHargaAwal}
        value={hargaAwal}
      />

      <TextInput
        style={styles.input}
        placeholder="Harga Jual"
        onChangeText={setHargaJual}
        value={hargaJual}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleInsert}>
        <Text style={styles.buttonText}>Tambah</Text>
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
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CreatePage;
