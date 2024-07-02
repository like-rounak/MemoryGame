import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Card from './Card';

const generateCards = () => {
  const letters = 'ABCDEFGH';
  const cardLetters = letters.repeat(2).split('');
  return cardLetters.sort(() => Math.random() - 0.5);
};

interface CardState {
  letter: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const App: React.FC = () => {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [matches, setMatches] = useState(0);
  const [canClick, setCanClick] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [topScore, setTopScore] = useState<{ attempts: number; time: number } | null>(null);
  const [completed, setCompleted] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startTime !== null) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime]);

  const resetGame = () => {
    const shuffledCards = generateCards().map(letter => ({
      letter,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffledCards);
    setFlippedIndices([]);
    setAttempts(0);
    setMatches(0);
    setCanClick(true);
    setElapsedTime(0);
    setStartTime(null);
    setCompleted(false);
    setIsNewHighScore(false);
  };

  const handleCardPress = (index: number) => {
    if (!canClick || cards[index].isFlipped || cards[index].isMatched) return;

    if (startTime === null) {
      setStartTime(Date.now());
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedIndices([...flippedIndices, index]);

    if (flippedIndices.length === 1) {
      setCanClick(false);
      setAttempts(attempts + 1);
      const [firstIndex] = flippedIndices;
      if (cards[firstIndex].letter === cards[index].letter) {
        newCards[firstIndex].isMatched = true;
        newCards[index].isMatched = true;
        setCards(newCards);
        setMatches(matches + 1);
        setFlippedIndices([]);
        setCanClick(true);

        if (matches + 1 === 8) {
          setCompleted(true);
          setElapsedTime((prev) => (Date.now() - startTime!));
          if (!topScore || attempts + 1 < topScore.attempts || (attempts + 1 === topScore.attempts && elapsedTime / 1000 < topScore.time)) {
            setTopScore({ attempts: attempts + 1, time: elapsedTime / 1000 });
            setIsNewHighScore(true);
          }
        }
      } else {
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[index].isFlipped = false;
          setCards(newCards);
          setFlippedIndices([]);
          setCanClick(true);
        }, 1000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Game</Text>
      <View style={styles.header}>
        <View style={styles.topScore}>
          {topScore && (
            <View style={styles.topScoreBox}>
              <Text style={styles.headerText}>Top Score</Text>
              <Text style={styles.headerText}>Attempts: {topScore.attempts}</Text>
              <Text style={styles.headerText}>Time: {topScore.time.toFixed(2)}s</Text>
            </View>
          )}
        </View>
        <View style={styles.timer}>
          <Text style={styles.headerText}>Time: {(elapsedTime / 1000).toFixed(2)}s</Text>
        </View>
        <View style={styles.attempts}>
          <Text style={styles.headerText}>Attempts: {attempts}</Text>
          <Text style={styles.headerText}>Matches: {matches}</Text>
        </View>
      </View>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <Card
            key={index}
            letter={card.letter}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onPress={() => handleCardPress(index)}
          />
        ))}
      </View>
      {completed && (
        <Text style={styles.completedText}>
          {isNewHighScore ? 'Congratulations on a new High Score!' : 'Completed!'}
        </Text>
      )}
      <Button title="Restart Game" onPress={resetGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topScore: {
    flex: 1,
    alignItems: 'flex-start',
  },
  topScoreBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  timer: {
    flex: 1,
    alignItems: 'center',
  },
  attempts: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerText: {
    fontSize: 18,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  completedText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
