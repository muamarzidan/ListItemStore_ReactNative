import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Index from './src/index';
import Login from './src/pages/loginPage';
import Daftar from './src/pages/registerPage';
import Dashboard from './src/pages/DashboardPage';
import FormCreate from './src/pages/controllers/create';
import FormSearch from './src/pages/controllers/search';
import FormDelete from './src/pages/controllers/delete';
import FormUpdate from './src/pages/controllers/update';
import FormUpdatedata from './src/pages/controllers/updateDataPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="indexPage"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="indexPage" component={Index} />
        <Stack.Screen name="loginPage" component={Login} />
        <Stack.Screen name="registerPage" component={Daftar} />
        <Stack.Screen name="dashboardPage" component={Dashboard} />
        <Stack.Screen name="createPage" component={FormCreate} />
        <Stack.Screen name="searchPage" component={FormSearch} />
        <Stack.Screen name="deletePage" component={FormDelete} />
        <Stack.Screen name="deletePage" component={FormUpdate} />
        <Stack.Screen name="deletePage" component={FormUpdatedata} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
