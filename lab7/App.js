import React from 'react';
import Tabs from './navigation/Tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, SafeAreaView } from 'react-native';
import 'react-native-get-random-values';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} />
      </SafeAreaView>

      <Tabs />
    </NavigationContainer>
  );
}
