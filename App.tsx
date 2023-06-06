import { View, Text, StyleSheet, Button} from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF8F9',
    marginHorizontal: 20
  },
});

export default function App() {
  return (
    <View>  
      <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'black'}}>Halo, selamat datang di Toko Tata Jaya Mandiri</Text>
          <Button
            // onPress={onPressLearnMore}
            title="Login"
            color="#068DA9"
          />
          <Button
            // onPress={onPressLearnMore}
            title="Cari Barang"
            color="#068DA9"
          />
        </View>
      </View>
    </View>
  )
};
