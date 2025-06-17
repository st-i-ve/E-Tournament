import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

interface DecryptedTextProps {
  text: string;
  style?: any;
  interval?: number;
}

const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  style = {},
  interval = 50,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => {
          const randomChar =
            characters[Math.floor(Math.random() * characters.length)];
          const newText =
            text.slice(0, currentIndex) +
            randomChar +
            text.slice(currentIndex + 1);
          return newText;
        });

        const revealTimeout = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);
        }, interval);

        return () => clearTimeout(revealTimeout);
      }, interval);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, interval, characters]);

  return <Text style={style}>{displayText}</Text>;
};

// export default DecryptedText;
// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import DecryptedText from './DecryptedText';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <DecryptedText text="Secret Message" style={styles.text} interval={30} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#ffffff',
//   },
// });

// export default App;