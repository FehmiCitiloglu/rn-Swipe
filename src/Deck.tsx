import React, {useState} from 'react';
import {PanResponder, View} from 'react-native';
import {Data} from '../types/data-type';
import {ReactNode} from 'react';
import {Animated} from 'react-native';
/**
 * Moving the card =>
 * 1 - User presses on screen
 * 2 - User drags finger (get dy dx info from gestureState)
 * 3 - Card Moves
 */
const Deck = ({
  data,
  renderCard,
}: {
  data: Data[];
  renderCard: (item: Data) => ReactNode;
}) => {
  const [position] = useState(new Animated.ValueXY());
  const [
    panResponder,
    // setPanResponder
  ] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // console.log('e', e);
        // console.log('gestureState', gestureState);
        position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (e, gestureState) => {},
    }),
  );

  const renderCards: () => ReactNode = () => {
    return data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={index}
            style={position.getLayout()}
            {...panResponder.panHandlers}>
            {renderCard(item)}
          </Animated.View>
        );
      }
      return renderCard(item);
    });
  };
  return (
    // <Animated.View style={position.getLayout()} {...panResponder.panHandlers}>
    // </Animated.View>
    <View>{renderCards()}</View>
  );
};
export default Deck;
