import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Containers/Login/Login';
import Main from './Containers/Main/Main';
import Menu from './Containers/Menu/Menu';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: '',
            headerStyle: {
              height: '0px'
            }
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: '',
            headerStyle: {
              height: '0px'
            }
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: '',
            headerStyle: {
              height: '0px'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
