import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Barang {
  kodeBarang: string;
  namaBarang: string;
  hargaJual: string;
  hargaAwal: string;
}

const UpdatePage = ({navigation}: {navigation: any}) => {
  const [dataBarang, setDataBarang] = useState<Barang[]>([]);

  useEffect(() => {
    getDataBarang();
  }, []);

  const getDataBarang = async () => {
    const storedData = await AsyncStorage.getItem('dataBarang');
    const parsedData = storedData ? JSON.parse(storedData) : [];
    setDataBarang(parsedData);
  };

  const handleUpdateBarang = (
    kodeBarang: string,
    namaBarang: string,
    hargaAwal: string,
    hargaJual: string,
  ) => {
    navigation.navigate('updateDataPage', {
      kodeBarang,
      namaBarang,
      hargaAwal,
      hargaJual,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Barang</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {dataBarang.map((item, index) => (
          <View style={styles.tableRow} key={`${item.kodeBarang}-${index}`}>
            <Text style={styles.tableData}>{item.kodeBarang}</Text>
            <Text style={styles.tableData}>{item.namaBarang}</Text>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() =>
                handleUpdateBarang(
                  item.kodeBarang,
                  item.namaBarang,
                  item.hargaAwal,
                  item.hargaJual,
                )
              }>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  contentContainer: {
    flexGrow: 1,
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
  tableData: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: 'blue',
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

export default UpdatePage;
