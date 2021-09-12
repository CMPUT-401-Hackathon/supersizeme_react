import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './Containers/Login/Login';
import Main from './Containers/Main/Main';
import Menu from './Containers/Menu/Menu';
import User from './Containers/User/User';
import NutrientCard from './Components/NutrientCard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
        <Stack.Screen
        name="User"
        component={User}
        options={{
          title: '',
          headerStyle: {
            height: '0px'
          }
        }}
        />
      </Stack.Navigator>
      {/* <Tab.Navigator>
      <Tab.Screen name="Home" component={User}/>
    </Tab.Navigator> */}
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
