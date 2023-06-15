import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IndexBarangPage = ({ navigation }: { navigation: any }) => {
  const [userData, setUserData] = useState<any>(null);
  const [dataBarang, setDataBarang] = useState<any[]>([]);

  useEffect(() => {
    checkUser();
    getDataBarang();
  }, []);

  const checkUser = async () => {
    const storedData = await AsyncStorage.getItem('userData');
    const parsedData = storedData ? JSON.parse(storedData) : null;
    setUserData(parsedData);
  };

  const getDataBarang = async () => {
    const storedData = await AsyncStorage.getItem('dataBarang');
    const parsedData = storedData ? JSON.parse(storedData) : [];
    setDataBarang(parsedData);
  };

  const handleLogin = () => {
    navigation.navigate('loginPage');
  };

  const handleCreateData = () => {
    navigation.navigate('CreateDataPage');
  };

  const renderTable = () => {
    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.columnHeader}>Kode Barang</Text>
          <Text style={styles.columnHeader}>Nama Barang</Text>
        </View>
        {dataBarang.map((item, index) => (
          <View style={styles.tableRow} key={`${item.kodeBarang}-${index}`}>
            <Text style={styles.tableData}>{item.kodeBarang}</Text>
            <Text style={styles.tableData}>{item.namaBarang}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderContent = () => {
    if (!userData) {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.emptyText}>Data kosong</Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Mau login?</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (dataBarang.length === 0) {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.emptyText}>Data kosong, masukkan data terlebih dahulu</Text>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateData}>
            <Text style={styles.buttonText}>Masukkan Data</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return renderTable();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Barang Toko ...</Text>
      {renderContent()}
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  tableContainer: {
    flex: 1,
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
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  createButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default IndexBarangPage;
