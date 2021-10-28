import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StokProduct from '../pages/stokproduct';
import Home from '../pages/Home';
import Transaksi from '../pages/Transaksi';
import NewStock from '../pages/NewStock';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Transaksi"
          options={{headerShown: false}}
          component={Transaksi}
        />
        <Stack.Screen
          name="NewStock"
          options={{headerShown: false}}
          component={NewStock}
        />
        <Stack.Screen name="StokProduct" component={StokProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
