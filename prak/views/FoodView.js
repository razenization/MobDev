import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  VirtualizedList,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import { debounce } from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ItemSeparator, Item } from '../components';
import { getItem, getItemCount, styles } from '../util';
import { Food } from '../util/food';

export default function FoodView() {
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');
  const [dimensions, setDimensions] = useState({ window, screen });

  const [listItems, setListItems] = useState([]);

  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchFood = async (search) => {
    if (search.length >= 3) {
      setIsLoading(true);
      const response = await fetch(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${search}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-app-key': 'a3bc3d58fc8886699ecd1febe61cd1f5',
            'x-app-id': '1b35350f',
          },
        },
      );

      const result = await response.json();
      setIsLoading(false);

      setListItems(Food.fromCollection(result.branded));
    } else {
      setListItems([]);
    }
  };

  const onItemDelete = useCallback(
    (foodItem) => {
      const index = listItems.indexOf(foodItem);

      listItems.splice(index, 1);
    },
    [listItems],
  );

  const onSearchHandler = useCallback(
    debounce(async (text) => await fetchFood(text), 500),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionStyle}>
        <MaterialCommunityIcons
          style={styles.imageStyle}
          name="magnify"
          color={'#808082'}
          size={26}
        />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => {
            setSearch(text);
            onSearchHandler(text);
          }}
          value={search}
          underlineColorAndroid="transparent"
          clearButtonMode={'while-editing'}
        />
      </View>

      {isLoading ? (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator />
        </View>
      ) : null}

      {listItems.length && !isLoading ? (
        <VirtualizedList
          data={listItems}
          initialNumToRender={4}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <Item
              item={{ ...item, onDelete: onItemDelete }}
              dimensions={{ dimensions, setDimensions }}
            />
          )}
          keyExtractor={(item) => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 15 }}>
          {!search | (search.length < 3)
            ? 'Submit a query longer than 3 symbols to get a list of available books.'
            : null}
        </Text>
      )}
    </SafeAreaView>
  );
}
