import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {AntDesign} from '@expo/vector-icons';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  itemPage: undefined;
  loginPage: undefined;
};

type ItemPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'itemPage'
>;

type ItemPageRouteProp = RouteProp<RootStackParamList, 'itemPage'>;

interface ItemPageProps {
  navigation: ItemPageNavigationProp;
  route: ItemPageRouteProp;
}

const CheckoutPage: React.FC<ItemPageProps> = ({navigation, route}) => {
  const [userData, setUserData] = useState<{
    namaToko: string;
    namaAdmin: string;
    password: string;
  } | null>(null);
  const [dataBarang, setDataBarang] = useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [keranjang, setKeranjang] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [keranjangVisible, setKeranjangVisible] = useState(false);

  useEffect(() => {
    checkUser();
    getDataBarang();
    getDataKeranjang();
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
    try {
      const storedData = await AsyncStorage.getItem('dataBarang');
      const convertData = storedData ? JSON.parse(storedData) : [];
      setDataBarang(convertData);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataKeranjang = async () => {
    try {
      const storedKeranjang = await AsyncStorage.getItem('keranjang');
      const convertKeranjang = storedKeranjang
        ? JSON.parse(storedKeranjang)
        : [];
      setKeranjang(convertKeranjang);
      setTotalItems(convertKeranjang.length);
    } catch (error) {
      console.log(error);
    }
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

  const handleAddToCart = async (item: any) => {
    try {
      const updatedKeranjang = [...keranjang, item];
      await AsyncStorage.setItem('keranjang', JSON.stringify(updatedKeranjang));
      setKeranjang(updatedKeranjang);
      setTotalItems(updatedKeranjang.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setKeranjangVisible(true);
  };

  const handleCloseModal = () => {
    setKeranjangVisible(false);
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
          <Text style={styles.columnHeader}>Kode</Text>
          <Text style={styles.columnHeader}>Nama</Text>
          <Text style={styles.columnHeader}>Harga</Text>
          <Text style={styles.columnHeader}>Aksi</Text>
        </View>
        {filteredData.map((item: any, index: number) => (
          <View style={styles.tableRow} key={`${item?.kodeBarang}-${index}`}>
            <Text style={styles.tableData}>{item?.kodeBarang}</Text>
            <Text style={styles.tableData}>{item?.namaBarang}</Text>
            <Text style={styles.tableData}>{item?.hargaJual}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}>
              <Text style={styles.addButtonLabel}>Tambah</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const renderModalContent = () => {
    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Keranjang Belanja</Text>
        <View style={styles.cartItems}>
          {keranjang.map((item: any, index: number) => (
            <View style={styles.cartItem} key={`${item?.kodeBarang}-${index}`}>
              <Text style={styles.cartItemText}>{item?.namaBarang}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
          <Text style={styles.closeButtonText}>Tutup</Text>
        </TouchableOpacity>
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
          <Text style={styles.emptyText}>
            Belum ada data yang Anda masukkan
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateData}>
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

      {totalItems > 0 && (
        <TouchableOpacity
          style={styles.keranjangIcon}
          onPress={handleOpenModal}>
          <AntDesign name="shoppingcart" size={24} color="white" />
          <View style={styles.keranjangBadge}>
            <Text style={styles.keranjangBadgeText}>{totalItems}</Text>
          </View>
        </TouchableOpacity>
      )}

      <Modal visible={keranjangVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>{renderModalContent()}</View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
  },
  createButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableContainer: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableData: {
    flex: 1,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  keranjangIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'green',
    borderRadius: 16,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  keranjangBadge: {
    backgroundColor: 'red',
    borderRadius: 16,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  keranjangBadgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItems: {
    maxHeight: 200,
    marginBottom: 16,
  },
  cartItem: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 8,
    width: '100%',
  },
  cartItemText: {
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CheckoutPage;
