import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { imageSelector } from '../assets/common';
import { itemInfoSelector } from '../assets/common';
import { Dimensions } from 'react-native';

const COLOR = '#EEEEEE';
const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export default function BookInfo(props) {
  const { id, title, subtitle, price } = props;
  const [dimensions, setDimensions] = useState({ window, screen });
  const [book, setBook] = useState(null);

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  const fetchBook = async () => {
    const response = await fetch(`https://api.itbook.store/1.0/books/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    setBook(result);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  useEffect(() => {
    fetchBook();
  });

  const orientation = () => {
    if (dimensions.window.height >= dimensions.window.width) {
      return styles;
    } else {
      return landscape;
    }
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView>
        {book ? (
          <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={orientation().infoScreen}>
              <View style={orientation().infoImageSection}>
                <Image
                  style={orientation().infoImage}
                  source={{
                    uri: book.image,
                  }}
                />
              </View>
              <View style={orientation().infoScreenTextView}>
                <Text style={styles.baseText}>
                  Title:
                  <Text style={styles.innerText}> {book.title || title}</Text>
                </Text>

                {book.subtitle || subtitle ? (
                  <Text style={styles.baseText}>
                    Subtitle:
                    <Text style={styles.innerText}>
                      {' '}
                      {book.subtitle || subtitle}
                    </Text>
                  </Text>
                ) : null}

                {book.authors ? (
                  <Text style={styles.baseText}>
                    Authors:
                    <Text style={styles.innerText}> {book.authors}</Text>
                  </Text>
                ) : null}

                {book.publisher ? (
                  <Text style={styles.baseText}>
                    Publisher:
                    <Text style={styles.innerText}> {book.publisher}</Text>
                  </Text>
                ) : null}

                {book.isbn13 ? (
                  <Text style={styles.baseText}>
                    Isbn13:
                    <Text style={styles.innerText}> {book.isbn13}</Text>
                  </Text>
                ) : null}

                {book.pages ? (
                  <Text style={styles.baseText}>
                    Pages:
                    <Text style={styles.innerText}> {book.pages}</Text>
                  </Text>
                ) : null}

                {book.year ? (
                  <Text style={styles.baseText}>
                    Year:
                    <Text style={styles.innerText}> {book.year}</Text>
                  </Text>
                ) : null}

                {book.rating ? (
                  <Text style={styles.baseText}>
                    Rating:
                    <Text style={styles.innerText}> {book.rating} / 5</Text>
                  </Text>
                ) : null}

                {book.desc ? (
                  <Text style={styles.baseText}>
                    Description:
                    <Text style={styles.innerText}> {book.desc}</Text>
                  </Text>
                ) : null}

                {book.price || price ? (
                  <Text style={styles.baseText}>
                    Price:
                    <Text style={styles.innerText}> {book.price || price}</Text>
                  </Text>
                ) : null}
              </View>
            </View>
          </ScrollView>
        ) : null}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    color: '#949494',
    fontWeight: '600',
    fontSize: 15,
    marginVertical: 1,
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
  infoScreenTextView: {
    marginTop: 10,
  },
});

const landscape = StyleSheet.create({
  infoScreen: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoImageSection: {
    flexDirection: 'row',
  },
  infoImage: {
    width: 200,
    height: 300,
  },
  infoScreenTextView: {},
});
