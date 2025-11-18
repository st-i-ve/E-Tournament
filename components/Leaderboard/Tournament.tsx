import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';
import Slider from '@react-native-community/slider';
import { useTournamentDimensions } from '@/hooks/useTournamentDimensions';
import { useTournamentPlayback } from '@/hooks/useTournamentPlayback';
import type { NodePosition, Relationship, TournamentNode } from '@/types/tournament';

export const Tournament: React.FC = () => {
  const { containerWidth, containerHeight, onLayout } = useTournamentDimensions(20, 300);
  const { currentRound, setCurrentRound, isAutoPlaying, setIsAutoPlaying, resetTournament, scaleAnim } = useTournamentPlayback();

  const nodes: TournamentNode[] = [
    { id: 'root', label: 'Champion', level: 0, color: '#22c55e' },
    { id: 'node-a', label: 'Semi Final A', level: 1, color: '#3b82f6' },
    { id: 'node-b', label: 'Semi Final B', level: 1, color: '#a855f7' },
    { id: 'node-a1', label: 'Quarter A1', level: 2, color: '#8b5cf6' },
    { id: 'node-a2', label: 'Quarter A2', level: 2, color: '#ef4444' },
    { id: 'node-b1', label: 'Quarter B1', level: 2, color: '#22c55e' },
    { id: 'node-b2', label: 'Quarter B2', level: 2, color: '#ef4444' },
    { id: 'node-a1-1', label: 'Round A1-1', level: 3, color: '#06b6d4' },
    { id: 'node-a1-2', label: 'Round A1-2', level: 3, color: '#ec4899' },
    { id: 'node-a2-1', label: 'Round A2-1', level: 3, color: '#f97316' },
    { id: 'node-a2-2', label: 'Round A2-2', level: 3, color: '#64748b' },
    { id: 'node-b1-1', label: 'Round B1-1', level: 3, color: '#06b6d4' },
    { id: 'node-b1-2', label: 'Round B1-2', level: 3, color: '#ec4899' },
    { id: 'node-b2-1', label: 'Round B2-1', level: 3, color: '#f97316' },
    { id: 'node-b2-2', label: 'Round B2-2', level: 3, color: '#64748b' },
    { id: 'node-a1-1-1', label: 'Man City', level: 4, color: '#84cc16' },
    { id: 'node-a1-1-2', label: 'Arsenal', level: 4, color: '#a3a3a3' },
    { id: 'node-a1-2-1', label: 'Liverpool', level: 4, color: '#14b8a6' },
    { id: 'node-a1-2-2', label: 'Chelsea', level: 4, color: '#8b5cf6' },
    { id: 'node-a2-1-1', label: 'Man United', level: 4, color: '#6366f1' },
    { id: 'node-a2-1-2', label: 'Tottenham', level: 4, color: '#eab308' },
    { id: 'node-a2-2-1', label: 'Newcastle', level: 4, color: '#a3e635' },
    { id: 'node-a2-2-2', label: 'Brighton', level: 4, color: '#f97316' },
    { id: 'node-b1-1-1', label: 'Aston Villa', level: 4, color: '#84cc16' },
    { id: 'node-b1-1-2', label: 'West Ham', level: 4, color: '#a3a3a3' },
    { id: 'node-b1-2-1', label: 'Wolves', level: 4, color: '#14b8a6' },
    { id: 'node-b1-2-2', label: 'Crystal Palace', level: 4, color: '#8b5cf6' },
    { id: 'node-b2-1-1', label: 'Brentford', level: 4, color: '#6366f1' },
    { id: 'node-b2-1-2', label: 'Fulham', level: 4, color: '#eab308' },
    { id: 'node-b2-2-1', label: 'Everton', level: 4, color: '#a3e635' },
    { id: 'node-b2-2-2', label: 'Nottingham', level: 4, color: '#f97316' },
  ];

  const relationships: Relationship[] = [
    { parent: 'root', child: 'node-a' },
    { parent: 'root', child: 'node-b' },
    { parent: 'node-a', child: 'node-a1' },
    { parent: 'node-a', child: 'node-a2' },
    { parent: 'node-b', child: 'node-b1' },
    { parent: 'node-b', child: 'node-b2' },
    { parent: 'node-a1', child: 'node-a1-1' },
    { parent: 'node-a1', child: 'node-a1-2' },
    { parent: 'node-a2', child: 'node-a2-1' },
    { parent: 'node-a2', child: 'node-a2-2' },
    { parent: 'node-b1', child: 'node-b1-1' },
    { parent: 'node-b1', child: 'node-b1-2' },
    { parent: 'node-b2', child: 'node-b2-1' },
    { parent: 'node-b2', child: 'node-b2-2' },
    { parent: 'node-a1-1', child: 'node-a1-1-1' },
    { parent: 'node-a1-1', child: 'node-a1-1-2' },
    { parent: 'node-a1-2', child: 'node-a1-2-1' },
    { parent: 'node-a1-2', child: 'node-a1-2-2' },
    { parent: 'node-a2-1', child: 'node-a2-1-1' },
    { parent: 'node-a2-1', child: 'node-a2-1-2' },
    { parent: 'node-a2-2', child: 'node-a2-2-1' },
    { parent: 'node-a2-2', child: 'node-a2-2-2' },
    { parent: 'node-b1-1', child: 'node-b1-1-1' },
    { parent: 'node-b1-1', child: 'node-b1-1-2' },
    { parent: 'node-b1-2', child: 'node-b1-2-1' },
    { parent: 'node-b1-2', child: 'node-b1-2-2' },
    { parent: 'node-b2-1', child: 'node-b2-1-1' },
    { parent: 'node-b2-1', child: 'node-b2-1-2' },
    { parent: 'node-b2-2', child: 'node-b2-2-1' },
    { parent: 'node-b2-2', child: 'node-b2-2-2' },
  ];

  const getNodePosition = (nodeId: string, round: number) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };

    const nodeWidth = 100;
    const nodeHeight = 32;
    let x = 0;
    let y = 0;

    if (nodeId === 'root') {
      x = containerWidth * 0.5;
      y = containerHeight * 0.5;
    } else if (nodeId === 'node-a') {
      x = containerWidth * (round >= 4 ? 0.4 : round >= 3 ? 0.12 : 0.36);
      y = containerHeight * 0.5;
    } else if (nodeId === 'node-b') {
      x = containerWidth * (round >= 4 ? 0.6 : round >= 3 ? 0.88 : 0.64);
      y = containerHeight * 0.5;
    } else if (nodeId === 'node-a1') {
      x = containerWidth * (round >= 3 ? 0.12 : round >= 2 ? 0.12 : 0.32);
      y = containerHeight * 0.3;
    } else if (nodeId === 'node-a2') {
      x = containerWidth * (round >= 3 ? 0.12 : round >= 2 ? 0.12 : 0.32);
      y = containerHeight * 0.7;
    } else if (nodeId === 'node-b1') {
      x = containerWidth * (round >= 3 ? 0.88 : round >= 2 ? 0.88 : 0.68);
      y = containerHeight * 0.3;
    } else if (nodeId === 'node-b2') {
      x = containerWidth * (round >= 3 ? 0.88 : round >= 2 ? 0.88 : 0.68);
      y = containerHeight * 0.7;
    } else if (nodeId.startsWith('node-a1-1')) {
      x = containerWidth * (round >= 2 ? 0.12 : 0.3);
      y =
        containerHeight *
        (nodeId === 'node-a1-1' ? 0.2 : nodeId === 'node-a1-1-1' ? 0.15 : 0.25);
    } else if (nodeId.startsWith('node-a1-2')) {
      x = containerWidth * (round >= 2 ? 0.12 : 0.3);
      y =
        containerHeight *
        (nodeId === 'node-a1-2' ? 0.4 : nodeId === 'node-a1-2-1' ? 0.35 : 0.45);
    } else if (nodeId.startsWith('node-a2-1')) {
      x = containerWidth * (round >= 2 ? 0.12 : 0.3);
      y =
        containerHeight *
        (nodeId === 'node-a2-1' ? 0.6 : nodeId === 'node-a2-1-1' ? 0.55 : 0.65);
    } else if (nodeId.startsWith('node-a2-2')) {
      x = containerWidth * (round >= 2 ? 0.12 : 0.3);
      y =
        containerHeight *
        (nodeId === 'node-a2-2' ? 0.8 : nodeId === 'node-a2-2-1' ? 0.75 : 0.85);
    } else if (nodeId.startsWith('node-b1-1')) {
      x = containerWidth * (round >= 2 ? 0.88 : 0.7);
      y =
        containerHeight *
        (nodeId === 'node-b1-1' ? 0.2 : nodeId === 'node-b1-1-1' ? 0.15 : 0.25);
    } else if (nodeId.startsWith('node-b1-2')) {
      x = containerWidth * (round >= 2 ? 0.88 : 0.7);
      y =
        containerHeight *
        (nodeId === 'node-b1-2' ? 0.4 : nodeId === 'node-b1-2-1' ? 0.35 : 0.45);
    } else if (nodeId.startsWith('node-b2-1')) {
      x = containerWidth * (round >= 2 ? 0.88 : 0.7);
      y =
        containerHeight *
        (nodeId === 'node-b2-1' ? 0.6 : nodeId === 'node-b2-1-1' ? 0.55 : 0.65);
    } else if (nodeId.startsWith('node-b2-2')) {
      x = containerWidth * (round >= 2 ? 0.88 : 0.7);
      y =
        containerHeight *
        (nodeId === 'node-b2-2' ? 0.8 : nodeId === 'node-b2-2-1' ? 0.75 : 0.85);
    }

    return { x, y, width: nodeWidth, height: nodeHeight };
  };

  const isNodeVisible = (node: TournamentNode, round: number) => {
    if (node.level === 0) return true;
    const targetLevel = 4 - round;
    return node.level === targetLevel;
  };

  const isPathVisible = (parent: string, child: string, round: number) => {
    const pathLevel = getPathLevel(parent, child);
    return pathLevel < 4 - round + 1;
  };

  const getPathLevel = (parent: string, child: string) => {
    if (
      child.includes('-1-1') ||
      child.includes('-2-1') ||
      child.includes('-1-2') ||
      child.includes('-2-2')
    ) {
      return 4;
    }
    if (
      (child.includes('-1') || child.includes('-2')) &&
      !child.includes('-1-') &&
      !child.includes('-2-')
    ) {
      return 3;
    }
    if (
      child === 'node-a1' ||
      child === 'node-a2' ||
      child === 'node-b1' ||
      child === 'node-b2'
    ) {
      return 2;
    }
    if (child === 'node-a' || child === 'node-b') {
      return 1;
    }
    return 0;
  };

  const getRoundInfo = (round: number) => {
    const roundNames = [
      'Level 4 nodes & all paths visible',
      'Level 3 nodes & level 4 paths hidden',
      'Level 2 nodes & level 3-4 paths hidden',
      'Level 1 nodes & level 2-4 paths hidden',
      'Final: Champion, Semi Finals only',
    ];
    return roundNames[round] || 'All nodes hidden';
  };

  

  const renderConnections = () => {
    return relationships.map((rel, index) => {
      const parentPos = getNodePosition(rel.parent, currentRound);
      const childPos = getNodePosition(rel.child, currentRound);

      if (!isPathVisible(rel.parent, rel.child, currentRound)) {
        return null;
      }

      const isLeftSide = childPos.x < parentPos.x;

      if (rel.parent === 'root') {
        return (
          <Line
            key={`line-${index}`}
            x1={parentPos.x}
            y1={parentPos.y}
            x2={childPos.x}
            y2={childPos.y}
            stroke="#e5e7eb"
            strokeWidth={2}
            strokeLinecap="round"
          />
        );
      } else {
        const midX = isLeftSide
          ? parentPos.x - Math.abs(parentPos.x - childPos.x) * 0.2
          : parentPos.x + Math.abs(parentPos.x - childPos.x) * 0.2;

        const pathData = `M ${parentPos.x} ${parentPos.y} H ${midX} V ${childPos.y} H ${childPos.x}`;

        return (
          <Path
            key={`path-${index}`}
            d={pathData}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={2}
            strokeLinecap="round"
          />
        );
      }
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Tournament League - Knockout System</Text>
        <Text style={styles.description}>
          Use the slider to progress through tournament rounds. Winners advance
          to the next level!
        </Text>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Tournament Levels</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={4}
          step={1}
          value={currentRound}
          onValueChange={(value) => setCurrentRound(value)}
          minimumTrackTintColor="#22c55e"
          maximumTrackTintColor="#4b5563"
          thumbTintColor="#22c55e"
        />
        <Text style={styles.roundInfo}>{getRoundInfo(currentRound)}</Text>
      </View>

      <View
        style={[
          styles.treeContainer,
          { width: containerWidth, height: containerHeight },
        ]}
        onLayout={onLayout}
      >
        <Svg style={StyleSheet.absoluteFill}>{renderConnections()}</Svg>

        {nodes.map((node) => {
          const pos = getNodePosition(node.id, currentRound);
          const visible = isNodeVisible(node, currentRound);
          const isRoot = node.id === 'root';
          const hideNode = currentRound >= 4 && node.level > 1;

          if (hideNode) return null;

          return (
            <Animated.View
              key={node.id}
              style={[
                styles.node,
                {
                  left: pos.x - (pos.width ?? 100) / 2,
                  top: pos.y - (pos.height ?? 100) / 2,
                  width: pos.width,
                  height: pos.height,
                  backgroundColor: node.color,
                  opacity: visible ? 1 : 0,
                  transform: isRoot ? [{ scale: scaleAnim }] : [{ scale: 1 }],
                },
              ]}
            >
              <Text style={styles.nodeText} numberOfLines={1}>
                {node.label}
              </Text>
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={resetTournament}>
          <Text style={styles.buttonText}>Reset Tournament</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsAutoPlaying(!isAutoPlaying)}
        >
          <Text style={styles.buttonText}>
            {isAutoPlaying ? 'Stop' : 'Auto Play'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>
          Move the slider to advance through tournament rounds. Each round,
          winners are randomly selected to advance to the next level. The
          tournament continues until a champion is crowned!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  scrollContent: {
    padding: 10,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#e5e7eb',
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 20,
    opacity: 0.9,
  },
  sliderContainer: {
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  sliderLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  slider: {
    width: 300,
    height: 40,
  },
  roundInfo: {
    fontSize: 16,
    color: '#e5e7eb',
    marginTop: 10,
    opacity: 0.9,
  },
  treeContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 15,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  node: {
    position: 'absolute',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.3)',
  },
  nodeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  controls: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  instructions: {
    marginTop: 20,
    marginBottom: 30,
    maxWidth: 600,
  },
  instructionsText: {
    color: '#e5e7eb',
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
});

export default Tournament;
