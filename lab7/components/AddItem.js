import React, { useReducer, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
} from 'react-native';
import { DATA } from '../views/BooksView';

const initialState = { title: '', subtitle: '', price: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'title':
    case 'subtitle':
      return { ...state, [action.type]: action.payload };
    case 'price':
      if (isNaN(action.payload)) {
        return { ...state };
      }
      return { ...state, price: action.payload };
    default:
      throw new Error('Supplied action.type is not recognized.');
  }
}

const AddItem = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState('');

  const newItem = () => {
    const errorFields = [];

    if (!state.title) errorFields.push('Title');
    if (!state.subtitle) errorFields.push('Subtitle');
    if (!state.price) errorFields.push('Price');

    if (errorFields.length) {
      setError(`Fields are not filled properly. (${errorFields})`);
      setTimeout(() => {
        setError('');
      }, 4000);
      return;
    }

    const newBook = {
      ...state,
      price: `$${(+state.price).toFixed(2)}`,
      isbn13: Date.now() + Math.random() * 100,
    };

    DATA.push(newBook);
    navigation.navigate('Books');
  };

  return (
    <View style={styles.main}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.sectionStyle}>
          <TextInput
            placeholder={'Title'}
            style={styles.textInputStyle}
            onChangeText={(text) => dispatch({ type: 'title', payload: text })}
            value={state.title}
          />
        </View>

        <View style={styles.sectionStyle}>
          <TextInput
            placeholder={'Subtitle'}
            style={styles.textInputStyle}
            onChangeText={(text) =>
              dispatch({ type: 'subtitle', payload: text })
            }
            value={state.subtitle}
          />
        </View>

        <View style={styles.sectionStyle}>
          <TextInput
            keyboardType={'numeric'}
            placeholder={'Price'}
            style={styles.textInputStyle}
            onChangeText={(text) =>
              dispatch({ type: 'price', payload: text.replaceAll(',', '.') })
            }
            value={state.price}
          />
        </View>

        <View style={{ padding: 10 }}>
          {error ? <Text style={styles.textTipStyle}>{error}</Text> : null}
        </View>

        <View style={styles.buttonStyle}>
          <Button title="Add Book" onPress={newItem} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  textInputStyle: {
    flex: 1,
    height: 40,
    margin: 2,
    marginLeft: 10,
    borderRadius: 10,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',

    height: 40,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 8,

    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    elevation: 2,
  },
  imageStyle: {
    margin: 5,
  },
  buttonStyle: {
    marginVertical: 90,
  },
  textStyle: {
    marginLeft: 26,
    fontWeight: 'bold',
    color: '#808082',
    marginTop: 20,
  },
  textTipStyle: {
    paddingTop: 8,
    marginLeft: 26,
    position: 'absolute',
    fontSize: 12,
    color: 'red',
  },
  closeButtonParent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    color: '#3076CB',
  },
});

export default AddItem;
