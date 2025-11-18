import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export function useTournamentPlayback() {
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isAutoPlaying) return;
    if (currentRound >= 4) {
      setIsAutoPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentRound((prev) => {
        const next = prev + 1;
        if (next >= 4) {
          setIsAutoPlaying(false);
        }
        return next;
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentRound]);

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: currentRound >= 4 ? 1.5 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentRound, scaleAnim]);

  const resetTournament = () => {
    setCurrentRound(0);
    setIsAutoPlaying(false);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return { currentRound, setCurrentRound, isAutoPlaying, setIsAutoPlaying, resetTournament, scaleAnim };
}