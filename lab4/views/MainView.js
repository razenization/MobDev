import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function MainView() {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center' }}>
        Мисак Олександр
        {'\n'}
        Група ІВ-81
        {'\n'}
        ЗК ІВ-8119
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
