import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Edit from './Edit';
import Confirmation from './Confirmation';

import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Signup} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;