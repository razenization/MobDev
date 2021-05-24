import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

export const MainView = () => {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center' }}>
        Mysak Oleksandr
        {'\n'}
        IV-81
        {'\n'}
        ЗК IV-8119
      </Text>
    </View>
  );
};
