import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Barang {
  kodeBarang: string;
  namaBarang: string;
  hargaJual: string;
  hargaAwal: string;
}

const DeletePage = () => {
  const [dataBarang, setDataBarang] = useState<Barang[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    getDataBarang();
  }, []);

  const getDataBarang = async () => {
    const storedData = await AsyncStorage.getItem('dataBarang');
    const parsedData = storedData ? JSON.parse(storedData) : [];
    const urutanData = parsedData.sort((a: Barang, b: Barang) => {
      const huruf1 = a.kodeBarang.charAt(2).toUpperCase();
      const huruf2 = b.kodeBarang.charAt(2).toUpperCase();
      return huruf1.localeCompare(huruf2);
    });
    setDataBarang(urutanData);
  };

  const alertDelete = async (kodeBarang: string) => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin menghapus barang ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => handleDeleteBarang(kodeBarang),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteBarang = async (kodeBarang: string) => {
    const newData = dataBarang.filter(item => item.kodeBarang !== kodeBarang);
    await AsyncStorage.setItem('dataBarang', JSON.stringify(newData));
    setDataBarang(newData);
  };

  const handleSearch = (text: string) => {
    setSearchKeyword(text);
  };

  const renderData = () => {
    const filteredData = dataBarang.filter(
      item =>
        item.kodeBarang.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.namaBarang.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    if (filteredData.length === 0) {
      return <Text style={styles.emptyText}>Data Barang Kosong</Text>;
    }

    return (
      <FlatList
        data={filteredData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableData}>{item.kodeBarang}</Text>
            <Text style={styles.tableData}>{item.namaBarang}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => alertDelete(item.kodeBarang)}
            >
              <Text style={styles.deleteButtonText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Barang</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Cari barang..."
        onChangeText={handleSearch}
        value={searchKeyword}
      />

      <View style={styles.tableRow}>
        <Text style={styles.columnHeader}>Kode Barang</Text>
        <Text style={styles.columnHeader}>Nama Barang</Text>
        <Text style={styles.columnHeader}></Text>
      </View>

      {renderData()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  columnHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableData: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DeletePage;
