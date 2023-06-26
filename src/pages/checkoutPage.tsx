import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  itemPage: undefined;
  loginPage: undefined;
};

type ItemPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'itemPage'
>;

interface ItemPageProps {
  navigation: ItemPageNavigationProp;
}

const CheckoutPage = ({ navigation }: ItemPageProps) => {
  const [userData, setUserData] = useState<{
    namaToko: string;
    namaAdmin: string;
    password: string;
  } | null>(null);
  const [dataBarang, setDataBarang] = useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    checkUser();
    getDataBarang();
  }, []);

  const checkUser = async () => {
    const storedNamaToko = await AsyncStorage.getItem('namaToko');
    const storedNamaAdmin = await AsyncStorage.getItem('namaAdmin');
    const storedPassword = await AsyncStorage.getItem('password');

    if (storedNamaToko && storedNamaAdmin && storedPassword) {
      const userData = {
        namaToko: storedNamaToko,
        namaAdmin: storedNamaAdmin,
        password: storedPassword,
      };
      setUserData(userData);
    }
  };

  const getDataBarang = async () => {
    const storedData = await AsyncStorage.getItem('dataBarang');
    const convertData = storedData ? JSON.parse(storedData) : [];
    setDataBarang(convertData);
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleLogin = () => {
    navigation.navigate('loginPage');
  };

  const handleCreateData = () => {
    navigation.navigate('loginPage');
  };

  const renderTable = () => {
    const filteredData = dataBarang.filter((item: any) => {
      const kodeBarang = item?.kodeBarang?.toLowerCase();
      const namaBarang = item?.namaBarang?.toLowerCase();
      const keyword = searchKeyword.toLowerCase();
      return kodeBarang.includes(keyword) || namaBarang.includes(keyword);
    });
    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.columnHeader}>Kode Barang</Text>
          <Text style={styles.columnHeader}>Nama Barang</Text>
        </View>
        {filteredData.map((item: any, index: number) => (
          <View style={styles.tableRow} key={`${item?.kodeBarang}-${index}`}>
            <Text style={styles.tableData}>{item?.kodeBarang}</Text>
            <Text style={styles.tableData}>{item?.namaBarang}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderContent = () => {
    if (!userData) {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.emptyText}>
            Data kosong dan Anda belum terdaftar
          </Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login terlebih dahulu</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (userData !== null && dataBarang.length === 0) {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.emptyText}>Belum ada data yang Anda masukkan</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateData}
          >
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
      <Text style={styles.title}>Data Barang Toko {userData?.namaToko}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari barang..."
        value={searchKeyword}
        onChangeText={handleSearch}
      />
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
  searchInput: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 5,
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

export default CheckoutPage;
