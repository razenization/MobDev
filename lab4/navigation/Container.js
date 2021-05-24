import React, { useLayoutEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BooksView from '../views/BooksView';
import AddItem from '../modals/AddItem';
import Info from '../modals/Info';

function HomeScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('New book')}
        >
          <MaterialCommunityIcons
            style={styles.addIcon}
            name="plus"
            color={'#808082'}
            size={30}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return <BooksView />;
}

function InfoForm({ route }) {
  const { fileName, title, subtitle, price } = route.params;

  return (
    <Info fileName={fileName} title={title} subtitle={subtitle} price={price} />
  );
}

const Stack = createStackNavigator();

export default function Container() {
  return (
    <Stack.Navigator initialRouteName="Books">
      <Stack.Screen name="Books" component={HomeScreen} />
      <Stack.Screen name="New book" component={AddItem} />
      <Stack.Screen name="Info" component={InfoForm} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  addIcon: {
    textAlign: 'right',
    marginHorizontal: 16,
    marginBottom: 5,
    marginTop: 2,
    color: '#3076CB',
  },
});
