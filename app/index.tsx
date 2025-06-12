import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { Zap, Trophy, Crown, Shield, Users, Activity } from 'lucide-react-native';
import PlayerCard from '@/components/PlayerCard';
import CoachCard from '@/components/CoachCard';
import LeagueCard from '@/components/LeagueCard';
import ReservesDrawer from '@/components/ReservesDrawer';

const { width } = Dimensions.get('window');

const formations = ['4-3-3', '4-4-2', '3-5-2'];

const playersData = {
  '4-3-3': [
    { position: 'LW', rating: 101, isStar: false },
    { position: 'ST', rating: 99, isStar: false },
    { position: 'RW', rating: 100, isStar: false },
    { position: 'LM', rating: 100, isStar: false },
    { position: 'CM', rating: 103, isStar: true },
    { position: 'RM', rating: 100, isStar: false },
    { position: 'LB', rating: 99, isStar: false },
    { position: 'CB', rating: 101, isStar: false },
    { position: 'CB', rating: 99, isStar: false },
    { position: 'RB', rating: 99, isStar: false },
    { position: 'GK', rating: 99, isStar: false },
  ],
};

const reservesData = [
  { position: 'ST', rating: 95, isStar: false },
  { position: 'CM', rating: 97, isStar: false },
  { position: 'CB', rating: 94, isStar: false },
  { position: 'GK', rating: 92, isStar: false },
  { position: 'LW', rating: 96, isStar: false },
  { position: 'RM', rating: 93, isStar: false },
  { position: 'LB', rating: 91, isStar: false },
];

export default function HomeScreen() {
  const [selectedFormation, setSelectedFormation] = useState('4-3-3');
  const [showReserves, setShowReserves] = useState(false);

  const handlePlayerPress = (player: any) => {
    console.log('Player pressed:', player);
  };

  const handleMatchHistory = () => {
    router.push('/history');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0c0c0c', '#1a1a1a', '#0c0c0c']}
        style={styles.background}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.titleContainer}>
                <Zap color="#00FF88" size={28} strokeWidth={2} />
                <Text style={styles.title}>H67</Text>
              </View>
              <View style={styles.strengthContainer}>
                <Activity color="#00FF88" size={20} />
                <Text style={styles.strengthLabel}>STRENGTH</Text>
                <Text style={styles.strengthValue}>3118</Text>
              </View>
            </View>
          </View>

          {/* Formation Tabs */}
          <View style={styles.formationTabs}>
            {formations.map((formation) => (
              <TouchableOpacity
                key={formation}
                style={[
                  styles.formationTab,
                  selectedFormation === formation && styles.activeFormationTab,
                ]}
                onPress={() => setSelectedFormation(formation)}
              >
                <Text
                  style={[
                    styles.formationTabText,
                    selectedFormation === formation && styles.activeFormationTabText,
                  ]}
                >
                  {formation}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Coach and League Cards */}
          <View style={styles.infoCards}>
            <CoachCard name="Mourinho" rating={3118} />
            <LeagueCard position={12} />
          </View>

          {/* Formation Field */}
          <View style={styles.fieldContainer}>
            <BlurView intensity={20} style={styles.fieldBlur}>
              <View style={styles.field}>
                {/* Forward Line */}
                <View style={styles.fieldRow}>
                  {playersData[selectedFormation].slice(0, 3).map((player, index) => (
                    <PlayerCard
                      key={`forward-${index}`}
                      position={player.position}
                      rating={player.rating}
                      isStar={player.isStar}
                      onPress={() => handlePlayerPress(player)}
                    />
                  ))}
                </View>

                {/* Midfield Line */}
                <View style={styles.fieldRow}>
                  {playersData[selectedFormation].slice(3, 6).map((player, index) => (
                    <PlayerCard
                      key={`midfield-${index}`}
                      position={player.position}
                      rating={player.rating}
                      isStar={player.isStar}
                      onPress={() => handlePlayerPress(player)}
                    />
                  ))}
                </View>

                {/* Defense Line */}
                <View style={styles.fieldRow}>
                  {playersData[selectedFormation].slice(6, 10).map((player, index) => (
                    <PlayerCard
                      key={`defense-${index}`}
                      position={player.position}
                      rating={player.rating}
                      isStar={player.isStar}
                      onPress={() => handlePlayerPress(player)}
                    />
                  ))}
                </View>

                {/* Goalkeeper */}
                <View style={styles.fieldRow}>
                  <PlayerCard
                    position={playersData[selectedFormation][10].position}
                    rating={playersData[selectedFormation][10].rating}
                    isStar={playersData[selectedFormation][10].isStar}
                    onPress={() => handlePlayerPress(playersData[selectedFormation][10])}
                  />
                </View>
              </View>
            </BlurView>
          </View>

          {/* Reserves Button */}
          <TouchableOpacity
            style={styles.reservesButton}
            onPress={() => setShowReserves(true)}
          >
            <BlurView intensity={20} style={styles.reservesButtonBlur}>
              <Users color="#00FF88" size={20} />
              <Text style={styles.reservesButtonText}>Reserves</Text>
              <Text style={styles.reservesCount}>Squad</Text>
              <Text style={styles.reservesSubtext}>7 Players</Text>
            </BlurView>
          </TouchableOpacity>

          {/* Match History Button */}
          <TouchableOpacity style={styles.matchHistoryButton} onPress={handleMatchHistory}>
            <LinearGradient
              colors={['#00FF88', '#00CC6A']}
              style={styles.matchHistoryGradient}
            >
              <Activity color="#000" size={20} strokeWidth={2} />
              <Text style={styles.matchHistoryText}>Match History</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        {/* Reserves Drawer */}
        <ReservesDrawer
          visible={showReserves}
          onClose={() => setShowReserves(false)}
          players={reservesData}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
  },
  background: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  strengthContainer: {
    alignItems: 'center',
    gap: 4,
  },
  strengthLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888888',
    letterSpacing: 1,
  },
  strengthValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  formationTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  formationTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  activeFormationTab: {
    backgroundColor: '#00FF88',
    borderColor: '#00FF88',
  },
  formationTabText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#888888',
  },
  activeFormationTabText: {
    color: '#000000',
  },
  infoCards: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  fieldContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  fieldBlur: {
    borderRadius: 20,
  },
  field: {
    padding: 20,
    gap: 20,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  reservesButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  reservesButtonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  reservesButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    flex: 1,
  },
  reservesCount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  reservesSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888888',
  },
  matchHistoryButton: {
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 16,
    overflow: 'hidden',
  },
  matchHistoryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  matchHistoryText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#000000',
  },
});