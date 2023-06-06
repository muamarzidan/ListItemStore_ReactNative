import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ECF8F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#068DA9',
    padding: 10,
    width: 150,
    borderRadius: 5,
  }
});

export default function App() {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.text}>Halo, selamat datang di Toko ...</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={{color: 'white'}}>Login</Text>
       </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={{color: 'white'}}>Cari Daftar Barang</Text>
       </TouchableOpacity>
      </View>
    </View>
  );
}
