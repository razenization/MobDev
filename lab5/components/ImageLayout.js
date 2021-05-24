import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Image from 'react-native-image-progress';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },

  column: {
    flexDirection: 'column',
  },

  imageInner: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: '#BEBEBE',
  },
});

const ImageLayout = ({ imageStore, width, height }) => {
  const imageBox = (size) => {
    if (size === 'small') {
      return {
        width: width,
        height: height,
        borderWidth: 1,
        borderColor: 'white',
      };
    } else if (size === 'large') {
      return {
        width: width * 3,
        height: height * 3,
        borderWidth: 1,
        borderColor: 'white',
      };
    }
  };

  const createColumn = (items) => {
    return <View style={styles.column}>{items}</View>;
  };

  const createRow = (items) => {
    return <View style={styles.row}>{items}</View>;
  };

  const getImages = () => {
    const readyToRender = imageStore.reduce((accum, image, idx) => {
      console.log('idx => ', idx);
      if (idx % 8 === 3) {
        const previous = accum.slice(0, -3);
        const items = [createColumn(accum.slice(-3))];

        const largeImage = (
          <View style={imageBox('large')}>
            <Image style={styles.imageInner} source={image} />
          </View>
        );
        items.push(largeImage);

        return [...previous, createRow(items)];
      }

      if (idx % 8 === 7) {
        const previous = accum.slice(0, -3);
        const items = accum.slice(-3);

        const newImage = (
          <View style={imageBox('small')}>
            <Image style={styles.imageInner} source={image} />
          </View>
        );
        items.push(newImage);

        return [...previous, createRow(items)];
      }

      return accum.concat(
        <View style={imageBox('small')} key={image.uri}>
          <Image style={styles.imageInner} source={image} />
        </View>,
      );
    }, []);

    const remainingImages = imageStore.length % 4;

    return imageStore.length % 8 > 4
      ? readyToRender
          .slice(0, -remainingImages)
          .concat(createRow(readyToRender.slice(-remainingImages)))
      : readyToRender;
  };

  return <View>{getImages()}</View>;
};

export default ImageLayout;
