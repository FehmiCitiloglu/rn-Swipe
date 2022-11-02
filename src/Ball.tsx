import {StyleSheet, View, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';

const Ball = () => {
  const [position] = useState<Animated.ValueXY>(
    new Animated.ValueXY({x: 0, y: 0}),
  );

  useEffect(() => {
    Animated.spring(position, {
      toValue: {x: 200, y: 500},
      //   speed: 0.015,
      //   velocity: 0.002,
      //   tension: 200,
      stiffness: 0.25,
      useNativeDriver: false,
    }).start();
  }, [position]);

  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball} />
    </Animated.View>
  );
};

export default Ball;

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black',
  },
});
