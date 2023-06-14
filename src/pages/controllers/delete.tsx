import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Barang {
  kodeBarang: string;
  namaBarang: string;
  hargaJual: string;
  hargaAwal: string;
}

const ItemPage = () => {
  const [dataBarang, setDataBarang] = useState<Barang[]>([]);

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

  const handleDelete = async (kodeBarang: string) => {
    Alert.alert(
      'Konfirmasi',     
      'Apakah Anda yakin ingin menghapus data ini?',
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

  const renderData = () => {
    if (dataBarang.length === 0) {
      return <Text style={styles.emptyText}>Data Kosong</Text>;
    }
    return (
      <FlatList
        data={dataBarang}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableData}>{item.kodeBarang}</Text>
            <Text style={styles.tableData}>{item.namaBarang}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.kodeBarang)}>
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

export default ItemPage;
