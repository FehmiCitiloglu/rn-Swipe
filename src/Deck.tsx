import React, {useState} from 'react';
import {Dimensions, PanResponder, View} from 'react-native';
import {Data} from '../types/data-type';
import {ReactNode} from 'react';
import {Animated} from 'react-native';
/**
 * Moving the card =>
 * 1 - User presses on screen
 * 2 - User drags finger (get dy dx info from gestureState)
 * 3 - Card Moves
 */
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

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
      onPanResponderMove: (_e, gestureState) => {
        // console.log('e', e);
        // console.log('gestureState', gestureState);
        position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (_e, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          console.log('swipe right');
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          console.log('swipe left');
        } else {
          resetPosition();
        }
      },
    }),
  );

  function resetPosition() {
    Animated.spring(position, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();
  }

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });
    return {...position.getLayout(), transform: [{rotate}]};
  };

  const renderCards: () => ReactNode = () => {
    return data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={index}
            style={getCardStyle()}
            {...panResponder.panHandlers}>
            {renderCard(item)}
          </Animated.View>
        );
      }
      return renderCard(item);
    });
  };
  return <View>{renderCards()}</View>;
};
export default Deck;
