import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import * as data from '../BooksList.json';
import { Dimensions } from 'react-native';

const DATA = data.books;

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const imageSelector = (key) => {
  switch (key) {
    case 'Image_01.png':
      return require('../images/Image_01.png');
    case 'Image_02.png':
      return require('../images/Image_02.png');
    case 'Image_03.png':
      return require('../images/Image_03.png');
    case 'Image_05.png':
      return require('../images/Image_05.png');
    case 'Image_06.png':
      return require('../images/Image_06.png');
    case 'Image_07.png':
      return require('../images/Image_07.png');
    case 'Image_08.png':
      return require('../images/Image_08.png');
    case 'Image_10.png':
      return require('../images/Image_10.png');

    default:
      return require('../images/Image_01.png');
  }
};

const getItem = (data, index) => {
  return {
    id: Math.random().toString(12).substring(0),
    title: `${data[index].title}`,
    subtitle: `${data[index].subtitle}`,
    isbn: `${data[index].isbn13}`,
    price: `${data[index].price}`,
    image: `${data[index].image}`,
  };
};

const getItemCount = (data) => data.length;

const BooksView = () => {
  const [dimensions, setDimensions] = useState({ window, screen });

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
    const dim = Dimensions.get('screen');
    if (dimensions.window.height >= dimensions.window.width) {
      return portrait;
    } else {
      return landscape;
    }
  };

  const Item = ({ title, subtitle, price, image }) => (
    <View style={portrait.item}>
      <View style={portrait.imageView}>
        <Image style={orientation().image} source={imageSelector(image)} />
      </View>
      <View style={orientation().textView}>
        <Text numberOfLines={1} style={portrait.title}>
          {title}
        </Text>
        {subtitle ? <Text style={portrait.specs}>{subtitle}</Text> : null}
        <Text style={portrait.specs}>{price}</Text>
      </View>
    </View>
  );

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '92%',
          backgroundColor: '#C8C8C8',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={portrait.container}>
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={({ item }) => {
          console.log('item => ', item);
          return (
            <Item
              title={item.title}
              subtitle={item.subtitle}
              isbn={item.isbn13}
              price={item.price}
              image={item.image}
            />
          );
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
};

const landscape = StyleSheet.create({
  textView: {
    flex: 10,
    marginRight: 80,
  },

  image: {
    width: 70,
    height: 120,
    marginLeft: 12,
  },
});

const portrait = StyleSheet.create({
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
  },

  textView: {
    flex: 10,
    marginLeft: 28,
  },

  specs: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default BooksView;
