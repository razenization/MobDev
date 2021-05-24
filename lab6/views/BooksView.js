import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { debounce } from 'lodash';

import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { imageSelector } from '../assets/common';

import Swipeable from 'react-native-gesture-handler/Swipeable';

export const DATA = [];
const COLOR = '#EEEEEE';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const getItem = (data, index) => {
  return {
    id: `${data[index].isbn13}`,
    title: `${data[index].title}`,
    subtitle: `${data[index].subtitle}`,
    price: `${data[index].price}`,
    image: `${data[index].image}`,
  };
};

const getItemCount = (data) => data.length;

export default function MoviesScreen() {
  const [dimensions, setDimensions] = useState({ window, screen });
  const [rerender, setRerender] = useState(false);

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  const orientation = () => {
    if (dimensions.window.height >= dimensions.window.width) {
      return styles;
    } else {
      return landscape;
    }
  };

  const LeftActions = () => {
    return (
      <View style={styles.rightAction}>
        <Text style={styles.actionText}>Delete</Text>
      </View>
    );
  };

  function Item(props) {
    const { id, title, subtitle, price, image } = props;
    const navigation = useNavigation();

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate('Info', {
            id,
            title,
            subtitle,
            price,
          })
        }
      >
        <Swipeable
          renderRightActions={LeftActions}
          onSwipeableRightOpen={() => {
            const obj = DATA.findIndex((elem) => elem.isbn13 === id);
            DATA.splice(obj, 1);
            setRerender(!rerender);
          }}
        >
          <View style={styles.item}>
            <View style={styles.imageView}>
              <Image
                style={orientation().image}
                source={{
                  uri: image,
                }}
              />
            </View>
            <View style={orientation().textView}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              {subtitle ? <Text style={styles.specs}>{subtitle}</Text> : null}
              <Text style={styles.specs}>{price}</Text>
            </View>
          </View>
        </Swipeable>
      </TouchableOpacity>
    );
  }

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 0.5,
          width: '92%',
          backgroundColor: '#e4e4e4',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    );
  };

  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [baseDataSource, setBaseDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(DATA);
    setBaseDataSource(DATA);
  }, []);

  const fetchBooks = async (search) => {
    if (search.length >= 3) {
      setIsLoading(true);
      const response = await fetch(
        `https://api.itbook.store/1.0/search/${search}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await response.json();
      setIsLoading(false);

      setFilteredDataSource(result.books);
    } else {
      setFilteredDataSource(baseDataSource);
    }
  };

  const onSearchHandler = useCallback(
    debounce(async (text) => await fetchBooks(text), 500),
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

      {filteredDataSource.length && !isLoading ? (
        <VirtualizedList
          data={filteredDataSource}
          initialNumToRender={4}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item }) => (
            <Item
              id={item.id || item.isbn13}
              title={item.title}
              subtitle={item.subtitle}
              price={item.price}
              image={item.image}
            />
          )}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 15 }}>
          {!search | (search.length < 3)
            ? 'Submit a query longer than 3 symbols to get a list of available books.'
            : null}{' '}
        </Text>
      )}
    </SafeAreaView>
  );
}

const landscape = StyleSheet.create({
  textView: {
    flex: 10,
    marginRight: 80,
  },

  poster: {
    width: 70,
    height: 120,
    marginLeft: 12,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 1,
    backgroundColor: 'white',
    height: 'auto',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 0,
    padding: 20,
  },
  title: {
    fontSize: 18,
  },
  image: {
    width: 70,
    height: 120,
  },

  imageView: {
    flex: 2,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },

  textView: {
    flex: 10,
    marginLeft: 28,
  },

  specs: {
    marginTop: 10,
    fontSize: 16,
  },

  // Search style section

  textInputStyle: {
    flex: 1,
    height: 40,
    margin: 2,
    borderRadius: 10,
  },

  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',

    height: 40,
    borderRadius: 10,
    margin: 10,
  },

  imageStyle: {
    margin: 5,
  },

  baseText: {
    color: '#949494',
    fontWeight: '600',
    fontSize: 15,
  },

  innerText: {
    color: 'black',
    fontWeight: '400',
  },

  infoScreen: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: 'white',
  },

  infoImageSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR,

    // shadow
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },

  infoImage: {
    width: 380,
    height: 600,
  },

  rightAction: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
  },

  actionText: {
    color: '#fff',
    padding: 20,
    textAlign: 'right',
  },
});
