import { useEffect, useState } from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';

export function useTournamentDimensions(initialPadding: number = 20, heightOffset: number = 300) {
  const size = Math.min(Dimensions.get('window').width - initialPadding, Dimensions.get('window').height - heightOffset);
  const [containerWidth, setContainerWidth] = useState<number>(size);
  const [containerHeight, setContainerHeight] = useState<number>(size);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      const next = Math.min(window.width - initialPadding, window.height - heightOffset);
      setContainerWidth(next);
      setContainerHeight(next);
    });
    return () => subscription?.remove();
  }, [initialPadding, heightOffset]);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setContainerWidth(width);
    setContainerHeight(height);
  };

  return { containerWidth, containerHeight, onLayout };
}