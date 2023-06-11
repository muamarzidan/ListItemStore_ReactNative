import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
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
        setDataBarang(parsedData);
    };

    const renderSeparator = () => {
        return <View style={styles.separator} />;
    };
    return (
        <FlatList
          data={dataBarang}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.container}
          ListHeaderComponent={
            <>
              <Text style={styles.title}>Data Barang</Text>
              <View style={styles.tableRow}>
                <Text style={styles.columnHeader}>Kode Barang</Text>
                <Text style={styles.columnHeader}>Nama Barang</Text>
                <Text style={styles.columnHeader}>Harga Jual</Text>
                <Text style={styles.columnHeader}>Harga Awal</Text>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableData}>{item.kodeBarang}</Text>
              <Text style={styles.tableData}>{item.namaBarang}</Text>
              <Text style={styles.tableData}>{item.hargaJual}</Text>
              <Text style={styles.tableData}>{item.hargaAwal}</Text>
            </View>
          )}
        />
      );
};

const styles = StyleSheet.create({
    container: {
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
        paddingHorizontal: 10,
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
    separator: {
        height: 1,
        backgroundColor: 'black',
        marginLeft: 10,
        marginRight: 10,
    },
});
  
export default ItemPage;
