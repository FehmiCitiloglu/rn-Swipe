import React, {ReactNode} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import Ball from './src/Ball';
import Deck from './src/Deck';
import {Data} from './types/data-type';
import {Card, Button} from '@rneui/themed';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA: Data[] = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'https://lh6.googleusercontent.com/inrCC5tytRItLThODc3LEsphP6XG5ZF1StjOirLvp3qCf6eC2GBSKz8fd-wbIgpTHeIRt5XmQ6F-9agWjl54_ZWle8KZQCasbMlAedjCc55ehWeq8UOvrHBak2ZtMoq6y6LDbdW4H7-Areyn8jRrVF14fbFof_4e0JkBwk3M70K9GqeKg4B91MoSaQ',
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
  },
];

const App = () => {
  MaterialCommunityIcon.loadFont();

  const renderCard: (item: Data) => ReactNode = item => {
    return (
      <Card key={item.id}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={{uri: item.uri}} />
        </View>
        <Card.Title>{item.text}</Card.Title>
        <Card.Divider />
        <Button title={'View Now!'} buttonStyle={styles.buttonStyle} />
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>All Done</Card.Title>
        <Text style={styles.noMoreText}>No More Content Here</Text>
        <Button title={'Get More'} buttonStyle={styles.buttonStyle} />
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Deck
        data={DATA}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: '#03A9F4',
  },
  imageContainer: {
    flex: 1,
    width: 500,
  },
  imageStyle: {
    flex: 1,
  },
  noMoreText: {
    marginBottom: 10,
  },
});
