import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gamepad2, Trophy, Zap } from 'lucide-react-native';

interface GamesSelectionStepProps {
  data: {
    selectedGames: string[];
  };
  onUpdate: (data: any) => void;
}

const GamesSelectionStep: React.FC<GamesSelectionStepProps> = ({ data, onUpdate }) => {
  const games = [
    { id: 'fifa', name: 'FIFA 24', icon: '⚽', category: 'Sports' },
    { id: 'efootball', name: 'eFootball', icon: '🥅', category: 'Sports' },
    { id: 'nba2k', name: 'NBA 2K24', icon: '🏀', category: 'Sports' },
    { id: 'cod', name: 'Call of Duty', icon: '🔫', category: 'FPS' },
    { id: 'valorant', name: 'Valorant', icon: '🎯', category: 'FPS' },
    { id: 'csgo', name: 'CS:GO', icon: '💣', category: 'FPS' },
    { id: 'lol', name: 'League of Legends', icon: '⚔️', category: 'MOBA' },
    { id: 'dota2', name: 'Dota 2', icon: '🛡️', category: 'MOBA' },
    { id: 'fortnite', name: 'Fortnite', icon: '🏗️', category: 'Battle Royale' },
    { id: 'apex', name: 'Apex Legends', icon: '🎮', category: 'Battle Royale' },
    { id: 'pubg', name: 'PUBG', icon: '🪂', category: 'Battle Royale' },
    { id: 'rocket', name: 'Rocket League', icon: '🚗', category: 'Sports' },
    { id: 'overwatch', name: 'Overwatch 2', icon: '🦾', category: 'FPS' },
    { id: 'tekken', name: 'Tekken 8', icon: '👊', category: 'Fighting' },
    { id: 'sf6', name: 'Street Fighter 6', icon: '🥊', category: 'Fighting' },
    { id: 'mortal', name: 'Mortal Kombat', icon: '⚡', category: 'Fighting' },
  ];

  const categories = [...new Set(games.map(game => game.category))];

  const handleGameToggle = (gameId: string) => {
    const selectedGames = data.selectedGames.includes(gameId)
      ? data.selectedGames.filter(id => id !== gameId)
      : [...data.selectedGames, gameId];
    
    onUpdate({ selectedGames });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Sports': return <Trophy size={16} color="#00ff88" />;
      case 'FPS': return <Zap size={16} color="#ff6b6b" />;
      case 'MOBA': return <Gamepad2 size={16} color="#4ecdc4" />;
      case 'Battle Royale': return <Zap size={16} color="#feca57" />;
      case 'Fighting': return <Trophy size={16} color="#ff9ff3" />;
      default: return <Gamepad2 size={16} color="#b3b3b3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sports': return '#00ff88';
      case 'FPS': return '#ff6b6b';
      case 'MOBA': return '#4ecdc4';
      case 'Battle Royale': return '#feca57';
      case 'Fighting': return '#ff9ff3';
      default: return '#b3b3b3';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Selection Summary */}
      <View style={styles.summaryContainer}>
        <LinearGradient
          colors={['rgba(0, 255, 136, 0.1)', 'rgba(0, 212, 255, 0.1)']}
          style={styles.summaryGradient}
        >
          <Gamepad2 size={20} color="#00ff88" />
          <Text style={styles.summaryText}>
            {data.selectedGames.length === 0
              ? 'Select the games you play to find tournaments'
              : `${data.selectedGames.length} game${data.selectedGames.length === 1 ? '' : 's'} selected`
            }
          </Text>
        </LinearGradient>
      </View>

      {/* Games by Category */}
      {categories.map((category, categoryIndex) => {
        const categoryGames = games.filter(game => game.category === category);
        const categoryColor = getCategoryColor(category);
        
        return (
          <View key={categoryIndex} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              {getCategoryIcon(category)}
              <Text style={[styles.categoryTitle, { color: categoryColor }]}>
                {category}
              </Text>
            </View>
            
            <View style={styles.gamesGrid}>
              {categoryGames.map((game, gameIndex) => {
                const isSelected = data.selectedGames.includes(game.id);
                
                return (
                  <Pressable
                    key={gameIndex}
                    style={[
                      styles.gameChip,
                      isSelected && styles.selectedGameChip,
                    ]}
                    onPress={() => handleGameToggle(game.id)}
                  >
                    <LinearGradient
                      colors={
                        isSelected
                          ? [`${categoryColor}20`, `${categoryColor}30`]
                          : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)']
                      }
                      style={styles.gameChipGradient}
                    >
                      <Text style={styles.gameIcon}>{game.icon}</Text>
                      <Text style={[
                        styles.gameText,
                        isSelected && { color: '#ffffff' },
                      ]}>
                        {game.name}
                      </Text>
                      {isSelected && (
                        <View style={[
                          styles.selectedIndicator,
                          { backgroundColor: categoryColor },
                        ]} />
                      )}
                    </LinearGradient>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}

      {/* Popular Games Tip */}
      <View style={styles.tipContainer}>
        <LinearGradient
          colors={['rgba(0, 212, 255, 0.1)', 'rgba(0, 255, 136, 0.1)']}
          style={styles.tipGradient}
        >
          <Trophy size={20} color="#00d4ff" />
          <Text style={styles.tipText}>
            Don't see your game? You can add more games later in your profile settings.
          </Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryContainer: {
    marginBottom: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.2)',
  },
  summaryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 12,
  },
  summaryText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gameChip: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 4,
  },
  selectedGameChip: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  gameChipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    position: 'relative',
  },
  gameIcon: {
    fontSize: 16,
  },
  gameText: {
    color: '#b3b3b3',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  selectedIndicator: {
    position: 'absolute',
    right: 8,
    top: '50%',
    marginTop: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  tipContainer: {
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  tipGradient: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 12,
  },
  tipText: {
    flex: 1,
    color: '#b3b3b3',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
});

export default GamesSelectionStep;