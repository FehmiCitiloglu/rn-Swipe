import React, {ReactElement, useEffect, useState} from 'react';
import {
  Dimensions,
  PanResponder,
  View,
  StyleSheet,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {Data} from '../types/data-type';
import {ReactNode} from 'react';
import {Animated, Text} from 'react-native';
import {Card, Button} from '@rneui/themed';
/**
 * Moving the card =>
 * 1 - User presses on screen
 * 2 - User drags finger (get dy dx info from gestureState)
 * 3 - Card Moves
 */
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

type Direction = 'left' | 'right';

interface DeckProps {
  data: Data[];
  renderCard: (item: Data) => ReactNode;
  onSwipeLeft?: (item: Data) => void;
  onSwipeRight?: (item: Data) => void;
}

const Deck = ({
  data,
  renderCard,
  onSwipeLeft = () => {
    return null;
  },
  onSwipeRight = () => {
    return null;
  },
}: DeckProps) => {
  const [index, setIndex] = useState(0);
  const [position] = useState(new Animated.ValueXY());
  const [panResponder] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_e, gestureState) => {
        position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (_e, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    }),
  );

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);

    LayoutAnimation.spring();
  }, []);

  const onSwipeComplete = (direction: Direction): void => {
    const item = data[index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({x: 0, y: 0});
    setIndex(prevIndex => (prevIndex += 1));
  };

  function forceSwipe(direction: Direction) {
    // timing is the exact same effect with spring but with bouncing
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

    Animated.timing(position, {
      toValue: {x, y: 0},
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => {
      onSwipeComplete(direction);
    }); // this callback will be executed after the animation end
  }

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

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>All Done</Card.Title>
        <Text style={styles.noMoreText}>No More Content Here</Text>
        <Button
          title={'Get More'}
          buttonStyle={styles.buttonStyle}
          onPress={() => setIndex(0)}
        />
      </Card>
    );
  };

  const renderCards: () => JSX.Element | (JSX.Element | null)[] = () => {
    if (index >= data.length) {
      return <View>{renderNoMoreCards()}</View>;
    }
    return data
      .map((item, i) => {
        if (i < index) {
          return null;
        }

        if (i === index) {
          return (
            <Animated.View
              key={i}
              style={[
                getCardStyle(),
                styles.cardStyle,
                // {top: 10 * (i - index)},
              ]}
              {...panResponder.panHandlers}>
              {renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            style={[styles.cardStyle, {top: 10 * (i - index)}]}
            key={item.id}>
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return renderCards() as ReactElement<any, any>;
};
export default Deck;

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
  buttonStyle: {
    backgroundColor: '#03A9F4',
  },
  noMoreText: {
    textAlign: 'center',
    marginBottom: 10,
  },
});
