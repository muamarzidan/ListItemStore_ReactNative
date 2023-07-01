import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ganti dengan pustaka ikon yang Anda gunakan

type RootStackParamList = {
  itemPage: undefined;
  loginPage: undefined;
};

type ItemPageNavigationProp = StackNavigationProp<RootStackParamList, 'itemPage'>;
type ItemPageRouteProp = RouteProp<RootStackParamList, 'itemPage'>;

interface ItemPageProps {
  navigation: ItemPageNavigationProp;
  route: ItemPageRouteProp;
}

interface BarangItem {
  kodeBarang: string;
  namaBarang: string;
  hargaJual: number;
}

interface KeranjangItem extends BarangItem {
  quantity: number;
}

const CheckoutPage: React.FC<ItemPageProps> = ({ navigation, route }) => {
  const [dataBarang, setDataBarang] = useState<BarangItem[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [keranjang, setKeranjang] = useState<KeranjangItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [keranjangVisible, setKeranjangVisible] = useState(false);

  useEffect(() => {
    getDataBarang();
    getDataKeranjang();
  }, []);

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
      const convertKeranjang = storedKeranjang ? JSON.parse(storedKeranjang) : [];
      setKeranjang(convertKeranjang);
      setTotalItems(convertKeranjang.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleAddToCart = async (item: BarangItem) => {
    try {
      const existingItem = keranjang.find((cartItem) => cartItem.kodeBarang === item.kodeBarang);

      if (existingItem) {
        const updatedKeranjang = keranjang.map((cartItem) => {
          if (cartItem.kodeBarang === item.kodeBarang) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        setKeranjang(updatedKeranjang);
        await AsyncStorage.setItem('keranjang', JSON.stringify(updatedKeranjang));
      } else {
        const updatedKeranjang = [...keranjang, { ...item, quantity: 1 }];
        setKeranjang(updatedKeranjang);
        await AsyncStorage.setItem('keranjang', JSON.stringify(updatedKeranjang));
      }

      setTotalItems((prevTotal) => prevTotal + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = async (item: KeranjangItem) => {
    try {
      if (item.quantity === 1) {
        const updatedKeranjang = keranjang.filter((cartItem) => cartItem.kodeBarang !== item.kodeBarang);
        setKeranjang(updatedKeranjang);
        await AsyncStorage.setItem('keranjang', JSON.stringify(updatedKeranjang));
      } else {
        const updatedKeranjang = keranjang.map((cartItem) => {
          if (cartItem.kodeBarang === item.kodeBarang) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        });
        setKeranjang(updatedKeranjang);
        await AsyncStorage.setItem('keranjang', JSON.stringify(updatedKeranjang));
      }

      setTotalItems((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    // Lakukan proses checkout di sini
    // Misalnya, kirim data keranjang ke server atau lakukan proses pembayaran

    // Setelah proses checkout selesai, kosongkan keranjang
    setKeranjang([]);
    setTotalItems(0);

    // Simpan keranjang yang kosong ke penyimpanan lokal
    await AsyncStorage.setItem('keranjang', JSON.stringify([]));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Checkout Page</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchKeyword}
        onChangeText={handleSearch}
      />

      <ScrollView>
        {dataBarang
          .filter((item) =>
            item.namaBarang.toLowerCase().includes(searchKeyword.toLowerCase())
          )
          .map((item) => (
            <TouchableOpacity
              key={item.kodeBarang}
              style={styles.itemContainer}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.itemName}>{item.namaBarang}</Text>
              <Text style={styles.itemPrice}>
                {typeof item.hargaJual=== 'string' ? item.hargaJual : item.hargaJual.toFixed(2)}
            </Text>
              <Icon name="plus" size={20} color="black" />
            </TouchableOpacity>
          ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => setKeranjangVisible(true)}
      >
        <Text style={styles.cartButtonText}>Cart ({totalItems})</Text>
      </TouchableOpacity>

      <Modal visible={keranjangVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle} onPress={() => setKeranjangVisible(false)}>
            Shopping Cart
          </Text>
          <ScrollView>
            {keranjang.map((item) => (
              <View key={item.kodeBarang} style={styles.cartItemContainer}>
                <Text style={styles.cartItemName}>{item.namaBarang}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveFromCart(item)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            <Text style={styles.totalText}>Total: ${keranjang.reduce((total, item) => total + item.hargaJual * item.quantity, 0).toFixed(2)}</Text>
          </ScrollView>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  cartItemName: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default CheckoutPage;
