import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Index from './src/index';
import Item from './src/pages/itemPage';
import Login from './src/pages/loginPage';
import Daftar from './src/pages/registerPage';
import Dashboard from './src/pages/dashboard';
import FormCreate from './src/pages/controllers/create';
import FormSearch from './src/pages/controllers/search';
import FormDelete from './src/pages/controllers/delete';
import FormUpdate from './src/pages/controllers/update';
import UpdateDataPage from './src/pages/controllers/updateDataPage';
import CheckoutPage from './src/pages/checkoutPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="indexPage"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="indexPage" component={Index} />
        <Stack.Screen name="itemPage" component={Item} />
        <Stack.Screen name="loginPage" component={Login} />
        <Stack.Screen name="registerPage" component={Daftar} />
        <Stack.Screen name="dashboardPage" component={Dashboard} />
        <Stack.Screen name="createPage" component={FormCreate} />
        <Stack.Screen name="searchPage" component={FormSearch} />
        <Stack.Screen name="deletePage" component={FormDelete} />
        <Stack.Screen name="updatePage" component={FormUpdate} />
        <Stack.Screen name="checkoutPage" component={CheckoutPage} />
        <Stack.Screen name="updateDataPage" component={UpdateDataPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
