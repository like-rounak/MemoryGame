import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CardProps {
  letter: string;
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
}

const getColorForLetter = (letter: string) => {
  switch (letter) {
    case 'A':
      return '#FF6F61';
    case 'B':
      return '#6B5B95';
    case 'C':
      return '#88B04B';
    case 'D':
      return '#F7CAC9';
    case 'E':
      return '#92A8D1';
    case 'F':
      return '#955251';
    case 'G':
      return '#B565A7';
    case 'H':
      return '#009B77';
    default:
      return '#FFFFFF';
  }
};

const Card: React.FC<CardProps> = ({ letter, isFlipped, isMatched, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, isMatched && styles.matchedCard]}>
      <View style={[styles.cardContent, { backgroundColor: isFlipped ? getColorForLetter(letter) : '#fff' }]}>
        <Text style={styles.cardText}>{isFlipped ? letter : '?'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '23%',
    margin: '1%',
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  matchedCard: {
    opacity: 0,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  cardText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Card;
