import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { X } from 'lucide-react-native';
import PlayerCard from './PlayerCard';

const { height } = Dimensions.get('window');

interface Player {
  position: string;
  rating: number;
  isStar: boolean;
}

interface ReservesDrawerProps {
  visible: boolean;
  onClose: () => void;
  players: Player[];
}

export default function ReservesDrawer({ visible, onClose, players }: ReservesDrawerProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, opacityAnim]);

  const handlePlayerPress = (player: Player) => {
    console.log('Reserve player pressed:', player);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: opacityAnim },
          ]}
        >
          <TouchableOpacity
            style={styles.backdropTouchable}
            onPress={onClose}
            activeOpacity={1}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.drawer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <BlurView intensity={40} style={styles.drawerBlur}>
            <View style={styles.drawerContent}>
              <View style={styles.header}>
                <View style={styles.handle} />
                <View style={styles.headerRow}>
                  <Text style={styles.title}>Reserves Squad</Text>
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <X color="#888888" size={24} strokeWidth={2} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.subtitle}>{players.length} Players Available</Text>
              </View>

              <ScrollView
                style={styles.playersList}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.playersGrid}>
                  {players.map((player, index) => (
                    <View key={index} style={styles.playerCardContainer}>
                      <PlayerCard
                        position={player.position}
                        rating={player.rating}
                        isStar={player.isStar}
                        onPress={() => handlePlayerPress(player)}
                      />
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </BlurView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouchable: {
    flex: 1,
  },
  drawer: {
    height: height * 0.6,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  drawerBlur: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
    backgroundColor: 'rgba(0, 255, 136, 0.05)',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.2)',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#888888',
  },
  playersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 16,
    paddingBottom: 20,
  },
  playerCardContainer: {
    marginBottom: 16,
  },
});