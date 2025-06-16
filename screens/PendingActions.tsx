import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Bell,
} from 'lucide-react-native';

// Mock pending actions data
const mockPendingActions = [
  {
    id: 'action-1',
    type: 'submit_result',
    matchId: 'match-123',
    opponent: 'Phoenix Rising',
    tournament: 'Champions Elite League',
    deadline: '2025-06-16T23:59:59Z',
    priority: 'high',
  },
  {
    id: 'action-2',
    type: 'verify_result',
    matchId: 'match-124',
    opponent: 'Lightning Strikes',
    tournament: 'Weekend Warriors Cup',
    submittedScore: '2-1',
    deadline: '2025-06-17T23:59:59Z',
    priority: 'medium',
  },
  {
    id: 'action-3',
    type: 'awaiting_verification',
    matchId: 'match-125',
    opponent: 'Desert Eagles',
    tournament: 'Champions Elite League',
    submittedAt: '2025-06-15T14:30:00Z',
    priority: 'low',
  },
];

const PendingActionsPage = () => {
  const navigation = useNavigation();
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<any>(null);

  const getActionIcon = (type: string) => {
    const size = 16;
    switch (type) {
      case 'submit_result':
        return <Upload size={size} color="#f87171" />;
      case 'verify_result':
        return <CheckCircle size={size} color="#4ade80" />;
      case 'awaiting_verification':
        return <Clock size={size} color="#facc15" />;
      default:
        return <AlertCircle size={size} color="#9ca3af" />;
    }
  };

  const getPriorityDot = (priority: string) => {
    const color =
      priority === 'high'
        ? '#f87171'
        : priority === 'medium'
        ? '#facc15'
        : '#9ca3af';
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
    const diffHours = Math.ceil(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60)
    );

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

  const renderBackgroundShapes = () => {
    return (
      <View style={styles.backgroundContainer} pointerEvents="none">
        {/* Triangles */}
        <View style={[styles.triangle, { top: 80, left: 40 }]} />
        <View
          style={[
            styles.triangle,
            {
              top: '33%',
              right: 80,
              width: 24,
              height: 24,
              transform: [{ rotate: '12deg' }],
            },
          ]}
        />
        <View
          style={[
            styles.triangle,
            { bottom: '25%', left: '25%', width: 40, height: 40 },
          ]}
        />

        {/* Circles */}
        <View
          style={[
            styles.circle,
            { top: '25%', left: '33%', width: 48, height: 48 },
          ]}
        />
        <View
          style={[
            styles.circle,
            { bottom: '33%', right: '25%', width: 32, height: 32 },
          ]}
        />
        <View
          style={[
            styles.circle,
            { top: '66%', left: 80, width: 24, height: 24 },
          ]}
        />

        {/* Rectangles */}
        <View
          style={[
            styles.rectangle,
            { top: '50%', right: 40, width: 48, height: 32 },
          ]}
        />
        <View
          style={[
            styles.rectangle,
            { bottom: 80, left: '50%', width: 32, height: 48 },
          ]}
        />

        {/* Lines */}
        <View style={[styles.verticalLine, { left: '25%' }]} />
        <View style={[styles.horizontalLine, { top: '33%' }]} />
        <View style={[styles.horizontalLine, { top: '66%' }]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderBackgroundShapes()}

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft size={16} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pending Actions</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{mockPendingActions.length}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {mockPendingActions.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={32} color="#4b5563" />
            <Text style={styles.emptyText}>All caught up!</Text>
          </View>
        ) : (
          <View style={styles.actionsList}>
            {mockPendingActions.map((action, index) => (
              <View key={action.id}>
                <TouchableWithoutFeedback
                  onPress={() => handleActionClick(action)}
                >
                  <View style={styles.actionItem}>
                    <View style={styles.actionContent}>
                      {getActionIcon(action.type)}
                      <View style={styles.actionTextContainer}>
                        <Text style={styles.actionTitle} numberOfLines={1}>
                          {getActionText(action)}
                        </Text>
                        <Text style={styles.actionSubtitle} numberOfLines={1}>
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
                  </View>
                </TouchableWithoutFeedback>

                {index < mockPendingActions.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modals would be implemented here */}
      {/* You would need to create Modal components similar to your web ones */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  triangle: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
    transform: [{ rotate: '45deg' }],
  },
  circle: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  verticalLine: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  horizontalLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  header: {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(34, 197, 94, 0.2)',
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  badge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 9999,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    color: '#f87171',
  },
  content: {
    flex: 1,
    padding: 16,
    position: 'relative',
    zIndex: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 12,
  },
  actionsList: {
    gap: 1,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  actionTextContainer: {
    flex: 1,
    minWidth: 0,
  },
  actionTitle: {
    fontSize: 14,
    color: 'white',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  actionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  deadlineText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
  },
});

export default PendingActionsPage;
