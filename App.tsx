import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Index from './src/index';
import Login from './src/pages/loginPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="indexPage"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="indexPage" component={Index} />
        <Stack.Screen name="loginPage" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
