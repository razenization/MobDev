import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, Image } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { styles, landscape } from '../util';

export default function Item(props) {
  const { foodName, servingUnit, calories, image, onDelete } = props.item;
  const { dimensions, setDimensions } = props.dimensions;

  const [isVisible, setIsVisible] = useState(true);

  const onDimChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onDimChange);
    return () => {
      Dimensions.removeEventListener('change', onDimChange);
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

  return (
    <Swipeable
      renderRightActions={LeftActions}
      onSwipeableRightOpen={() => {
        onDelete(props.item);
        setIsVisible(false);
      }}
    >
      <View style={{ ...styles.item, display: !isVisible ? 'none' : 'flex' }}>
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
            {foodName}
          </Text>
          <Text style={styles.specs}>
            Serving unit:{' '}
            {`"${servingUnit[0].toUpperCase() + servingUnit.slice(1)}"`}
          </Text>
          <Text style={styles.specs}>Calories: {calories}</Text>
        </View>
      </View>
    </Swipeable>
  );
}
