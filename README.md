
# Memory Game

A memory game implemented in React Native with TypeScript, where players match pairs of cards to win. This project uses Expo for development.

## Features

- 16 cards with letters from A to H, shuffled at the start of each game.
- Cards are displayed in a 4x4 grid.
- Flip cards to find matching pairs.
- Track the number of attempts and matches.
- Show elapsed time and top scores.
- Congratulate the player for a new high score.
- A stopwatch starts on the first card flip and stops when all matches are found.

## Requirements

- [Node.js](https://nodejs.org/) (version 18 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (Install with `npm install -g expo-cli`)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Clone the Repository

```bash
git clone https://github.com/like-rounak/MemoryGame.git
cd memory-game
```

### Install Dependencies

Install the necessary packages by running:

```bash
npm install
```

### Run the App

To start the development server and run the app, use:

```bash
expo start
```

This will open a new tab in your default browser with the Expo Developer Tools. You can also scan the QR code with the Expo Go app on your mobile device to see the app running on your device.

### Commands

- **Start the development server:** `npm start` or `expo start`
- **Run on an iOS simulator:** `npm run ios`
- **Run on an Android emulator:** `npm run android`

### Project Structure

- **`App.tsx`**: Main entry point of the application where the game logic and UI components are implemented.
- **`Card.tsx`**: Component for rendering individual cards.
- **`README.md`**: This file.

### Development

To make changes to the game, modify `App.tsx` for game logic and `Card.tsx` for card rendering and styles.

### Example Gameplay

1. Cards start face down. Tap on a card to flip it.
2. Find and match pairs of cards with the same letter.
3. The game tracks attempts and matches.
4. A stopwatch tracks the time from the first card flip.
5. When all pairs are matched, the game shows "Completed!" and checks if a new high score is achieved.

### Contributing

Feel free to fork the repository and submit pull requests. Any improvements, bug fixes, or features are welcome.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Acknowledgements

- [React Native](https://reactnative.dev/) - Framework for building native apps using React.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
- [Expo](https://expo.dev/) - Framework and platform for universal React applications.
