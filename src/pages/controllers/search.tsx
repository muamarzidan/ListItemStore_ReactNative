import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Barang {
  kodeBarang: string;
  namaBarang: string;
  hargaJual: string;
  hargaAwal: string;
}

const ITEMS_PER_PAGE = 10;

const ItemPage = () => {
  const [dataBarang, setDataBarang] = useState<Barang[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    getDataBarang();
  }, []);

  const getDataBarang = async () => {
    try {
      const storedData = await AsyncStorage.getItem('dataBarang');
      const parsedData = storedData ? JSON.parse(storedData) : [];
      setDataBarang(parsedData);
    } catch (error) {
      console.log('Error saat pengambilan data:', error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(dataBarang.length / ITEMS_PER_PAGE);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (text: string) => {
    setSearchKeyword(text);
    setCurrentPage(1);
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const getPageData = () => {
    const filteredData = dataBarang.filter(
      item =>
        item.kodeBarang.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.namaBarang.toLowerCase().includes(searchKeyword.toLowerCase()),
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
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
        <Text style={styles.columnHeader}>Harga Jual</Text>
        <Text style={styles.columnHeader}>Harga Awal</Text>
      </View>

      <FlatList
        data={getPageData()}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.tableContainer}
        renderItem={({item}) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableData}>{item.kodeBarang}</Text>
            <Text style={styles.tableData}>{item.namaBarang}</Text>
            <Text style={styles.tableData}>{item.hargaJual}</Text>
            <Text style={styles.tableData}>{item.hargaAwal}</Text>
          </View>
        )}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={handlePrevPage}>
          <Text style={styles.paginationButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>{currentPage}</Text>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={handleNextPage}>
          <Text style={styles.paginationButtonText}>&gt;</Text>
        </TouchableOpacity>
      </View>
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
  },
  tableContainer: {
    flexGrow: 1,
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationButton: {
    paddingHorizontal: 10,
  },
  paginationButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  paginationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
  },
});

export default ItemPage;
