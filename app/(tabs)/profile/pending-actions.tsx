import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Upload, CircleCheck as CheckCircle, Clock, CircleAlert as AlertCircle, Bell } from 'lucide-react-native';
import { Badge } from '@/components/ui/badge';
import { ResultSubmissionModal } from '@/components/ResultSubmissionModal';
import { ResultVerificationModal } from '@/components/ResultVerificationModal';
import { router } from 'expo-router';

// Mock pending actions data
const mockPendingActions = [
  {
    id: 'action-1',
    type: 'submit_result',
    matchId: 'match-123',
    opponent: 'Phoenix Rising',
    tournament: 'Champions Elite League',
    deadline: '2025-06-16T23:59:59Z',
    priority: 'high'
  },
  {
    id: 'action-2',
    type: 'verify_result',
    matchId: 'match-124',
    opponent: 'Lightning Strikes',
    tournament: 'Weekend Warriors Cup',
    submittedScore: '2-1',
    deadline: '2025-06-17T23:59:59Z',
    priority: 'medium'
  },
  {
    id: 'action-3',
    type: 'awaiting_verification',
    matchId: 'match-125',
    opponent: 'Desert Eagles',
    tournament: 'Champions Elite League',
    submittedAt: '2025-06-15T14:30:00Z',
    priority: 'low'
  }
];

export default function PendingActionsPage() {
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<any>(null);

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'submit_result':
        return <Upload color="#ef4444" size={16} />;
      case 'verify_result':
        return <CheckCircle color="#22c55e" size={16} />;
      case 'awaiting_verification':
        return <Clock color="#f59e0b" size={16} />;
      default:
        return <AlertCircle color="#9ca3af" size={16} />;
    }
  };

  const getPriorityDot = (priority: string) => {
    const color = priority === 'high' ? '#ef4444' : 
                 priority === 'medium' ? '#f59e0b' : '#9ca3af';
    return <View style={[styles.priorityDot, { backgroundColor: color }]} />;
  };

  const getActionText = (action: any) => {
    switch (action.type) {
      case 'submit_result':
        return `Submit result vs ${action.opponent}`;
      case 'verify_result':
        return `Verify result vs ${action.opponent}`;
      case 'awaiting_verification':
        return `Awaiting verification from ${action.opponent}`;
      default:
        return 'Unknown action';
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffHours = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h`;
    } else {
      const diffDays = Math.ceil(diffHours / 24);
      return `${diffDays}d`;
    }
  };

  const handleActionClick = (action: any) => {
    setSelectedAction(action);
    if (action.type === 'submit_result') {
      setIsSubmissionModalOpen(true);
    } else if (action.type === 'verify_result') {
      setIsVerificationModalOpen(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Geometric background elements */}
      <View style={styles.backgroundElements}>
        {/* Triangles */}
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View style={[styles.triangle, { top: 200, right: 80, transform: [{ rotate: '12deg' }] }]} />
        <View style={[styles.triangle, { bottom: 200, left: 100 }]} />
        
        {/* Circles */}
        <View style={[styles.circle, { top: 150, left: 120, width: 48, height: 48 }]} />
        <View style={[styles.circle, { bottom: 250, right: 100, width: 32, height: 32 }]} />
        <View style={[styles.circle, { top: 400, left: 80, width: 24, height: 24 }]} />
        
        {/* Rectangles */}
        <View style={[styles.rectangle, { top: 300, right: 40, width: 48, height: 32 }]} />
        <View style={[styles.rectangle, { bottom: 80, left: 200, width: 32, height: 48 }]} />
        
        {/* Lines */}
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
        <View style={[styles.horizontalLine, { top: '66%' }]} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#22c55e" size={20} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Pending Actions</Text>
            <Badge style={styles.countBadge}>
              {mockPendingActions.length}
            </Badge>
          </View>
        </View>

        {/* Actions List */}
        <View style={styles.actionsList}>
          {mockPendingActions.length === 0 ? (
            <View style={styles.emptyState}>
              <Bell color="#6b7280" size={32} />
              <Text style={styles.emptyStateText}>All caught up!</Text>
            </View>
          ) : (
            mockPendingActions.map((action, index) => (
              <View key={action.id}>
                <TouchableOpacity 
                  style={styles.actionItem}
                  onPress={() => handleActionClick(action)}
                  activeOpacity={0.7}
                >
                  <View style={styles.actionContent}>
                    <View style={styles.actionIcon}>
                      {getActionIcon(action.type)}
                    </View>
                    <View style={styles.actionDetails}>
                      <Text style={styles.actionText}>
                        {getActionText(action)}
                      </Text>
                      <Text style={styles.tournamentText}>
                        {action.tournament}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.actionMeta}>
                    {action.deadline && (
                      <Text style={styles.deadlineText}>
                        {formatDeadline(action.deadline)}
                      </Text>
                    )}
                    {getPriorityDot(action.priority)}
                  </View>
                </TouchableOpacity>
                
                {index < mockPendingActions.length - 1 && (
                  <View style={styles.separator} />
                )}
              </View>
            ))
          )}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Modals */}
      {selectedAction && (
        <>
          <ResultSubmissionModal
            isOpen={isSubmissionModalOpen}
            onClose={() => {
              setIsSubmissionModalOpen(false);
              setSelectedAction(null);
            }}
            matchData={{
              opponent: selectedAction.opponent,
              tournament: selectedAction.tournament,
              homeTeam: 'Your Team',
              awayTeam: selectedAction.opponent,
              deadline: selectedAction.deadline
            }}
          />
          
          <ResultVerificationModal
            isOpen={isVerificationModalOpen}
            onClose={() => {
              setIsVerificationModalOpen(false);
              setSelectedAction(null);
            }}
            verificationData={{
              opponent: selectedAction.opponent,
              tournament: selectedAction.tournament,
              submittedScore: selectedAction.submittedScore || '0-0',
              homeTeam: 'Your Team',
              awayTeam: selectedAction.opponent,
              deadline: selectedAction.deadline,
              hasScreenshot: true,
              aiConfidence: 95
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  triangle: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
    transform: [{ rotate: '45deg' }],
  },
  circle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 50,
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  scrollView: {
    flex: 1,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  countBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  actionsList: {
    paddingHorizontal: 16,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionDetails: {
    flex: 1,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  tournamentText: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  actionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deadlineText: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    marginVertical: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyStateText: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 12,
  },
  bottomSpacing: {
    height: 80,
  },
});