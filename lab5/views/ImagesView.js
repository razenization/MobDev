import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ImageLayout from '../components/ImageLayout';

import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

function ImagesContainer({ navigation }) {
  const styles = StyleSheet.create({
    addIcon: {
      textAlign: 'right',
      marginHorizontal: 16,
      marginBottom: 5,
      marginTop: 2,
      color: '#3076CB',
    },

    container: {
      marginTop: StatusBar.currentHeight,
      backgroundColor: 'white',
      flex: 1,
      borderWidth: 1,
      borderColor: 'white',
    },
  });

  const [imageStore, setImageStore] = useState([]);
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
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

  const pickImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!pickedImage.cancelled) {
      setImageStore((prevState) => [...prevState, { uri: pickedImage.uri }]);
    }
  };

  const imageSize = {
    width: dimensions.window.width / 4,
    height: dimensions.window.width / 4,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageLayout
          key={Date.now()}
          imageStore={imageStore}
          width={imageSize.width}
          height={imageSize.height}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function ImagesView() {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Images">
      <Stack.Screen name="Images" component={ImagesContainer} />
    </Stack.Navigator>
  );
}
