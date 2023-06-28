import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';


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

  const handleRemoveFromCart = async (item: BarangItem) => {
    try {
      const updatedKeranjang = keranjang.map((cartItem) => {
        if (cartItem.kodeBarang === item.kodeBarang) {
          return {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          };
        }
        return cartItem;
      });

      const filteredKeranjang = updatedKeranjang.filter((cartItem) => cartItem.quantity > 0);

      setKeranjang(filteredKeranjang);
      setTotalItems((prevTotal) => prevTotal - 1);

      await AsyncStorage.setItem('keranjang', JSON.stringify(filteredKeranjang));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    // Lakukan logika checkout
    // Misalnya, melakukan pengiriman data keranjang ke server atau proses pembayaran

    // Setelah proses checkout selesai, kosongkan keranjang
    setKeranjang([]);
    setTotalItems(0);
    await AsyncStorage.removeItem('keranjang');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchKeyword}
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView>
        {dataBarang.map((item) => (
          <View key={item.kodeBarang} style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.namaBarang}</Text>
            <Text style={styles.itemPrice}>Rp {item.hargaJual}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
              <Text style={styles.buttonText}>Tambah Barang</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Modal visible={keranjangVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Shopping Cart</Text>
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
          </ScrollView>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity style={styles.cartButton} onPress={() => setKeranjangVisible(true)}>
        <Text style={styles.cartButtonText}>{totalItems}</Text>
        <Icon name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: 'green',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default CheckoutPage;
