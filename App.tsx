import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Index from './src/index';
import Login from './src/pages/loginPage';
import Daftar from './src/pages/registerPage';
import Dashboard from './src/pages/dashboard';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
