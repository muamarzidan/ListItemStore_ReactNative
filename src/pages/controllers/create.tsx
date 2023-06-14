import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePage = () => {
  const [kodeBarang, setKodeBarang] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [hargaAwal, setHargaAwal] = useState('');
  const [hargaJual, setHargaJual] = useState('');

  const handleSubmit = async () => {
    if (!kodeBarang || !namaBarang || !hargaAwal || !hargaJual) {
      Alert.alert('Mohon isi semua data terlebih dahulu');
      return;
    }

    const barang = {
      kodeBarang,
      namaBarang,
      hargaAwal,
      hargaJual,
    };
    const hasilDataBarang = await AsyncStorage.getItem('dataBarang');
    const dataBarang = hasilDataBarang ? JSON.parse(hasilDataBarang) : [];

    dataBarang.push(barang);
    await AsyncStorage.setItem('dataBarang', JSON.stringify(dataBarang));

    setKodeBarang('');
    setNamaBarang('');
    setHargaAwal('');
    setHargaJual('');
    Alert.alert('Data barang berhasil ditambahkan');
  };

  // loop create
  const autoCreateData = async () => {
    for (let i = 0; i < 10; i++) {
      const charCode = 65 + i; // Mendapatkan kode ASCII huruf berdasarkan urutan
      const char = String.fromCharCode(charCode); // Mengonversi kode ASCII ke karakter huruf

      const barang = {
        kodeBarang: `TJ${char}${i + 1}`,
        namaBarang: `Lampu Watt ${i + 1}`,
        hargaAwal: `Rp.${i + 1000}`,
        hargaJual: `Rp.${i + 1500}`,
      };

      const hasilDataBarang = await AsyncStorage.getItem('dataBarang');
      const dataBarang = hasilDataBarang ? JSON.parse(hasilDataBarang) : [];

      dataBarang.push(barang);
      await AsyncStorage.setItem('dataBarang', JSON.stringify(dataBarang));
    }

    Alert.alert('Data barang berhasil dibuat secara otomatis');
  };

  useEffect(() => {
    const isTesting = true;
    if (isTesting) {
      autoCreateData();
    }
  }, []);

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

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
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
