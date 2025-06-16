import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Award,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react-native';
import Counter from '@/components/Counter';

interface ResultVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  verificationData: {
    opponent: string;
    tournament: string;
    submittedScore: string;
    homeTeam: string;
    awayTeam: string;
    deadline: string;
    hasScreenshot: boolean;
    aiConfidence?: number;
  };
}

const ResultVerificationModal = ({
  isOpen,
  onClose,
  verificationData,
}: ResultVerificationModalProps) => {
  const [decision, setDecision] = useState<'approve' | 'dispute' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasOwnScreenshot, setHasOwnScreenshot] = useState<boolean | null>(
    null
  );
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const handleDecision = async (action: 'approve' | 'dispute') => {
    setIsSubmitting(true);
    setDecision(action);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 2000);
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

  if (hasOwnScreenshot === null) {
    return (
      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Verify Result</Text>
              <Text style={styles.modalDescription}>
                {verificationData.opponent} submitted a result
              </Text>
            </View>

            {/* Match Info */}
            <View style={styles.matchInfoContainer}>
              <View style={styles.matchInfoHeader}>
                <View style={styles.tournamentInfo}>
                  <Award size={14} color="#34D399" />
                  <Text style={styles.tournamentText}>
                    {verificationData.tournament}
                  </Text>
                </View>
                <View style={styles.deadlineBadge}>
                  <Clock size={10} color="#F97316" />
                  <Text style={styles.deadlineText}>
                    {formatDeadline(verificationData.deadline)}
                  </Text>
                </View>
              </View>

              <View style={styles.matchCenter}>
                <Text style={styles.teamsText}>
                  {verificationData.homeTeam} vs {verificationData.awayTeam}
                </Text>
                <Text style={styles.scoreText}>
                  {verificationData.submittedScore}
                </Text>
              </View>

              {verificationData.hasScreenshot &&
                verificationData.aiConfidence && (
                  <View style={styles.aiVerified}>
                    <CheckCircle size={14} color="#34D399" />
                    <Text style={styles.aiVerifiedText}>
                      AI Verified ({verificationData.aiConfidence}%)
                    </Text>
                  </View>
                )}
            </View>

            {/* Screenshot Question */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Do you have a screenshot?</Text>

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[styles.button, styles.outlineButton]}
                  onPress={() => setHasOwnScreenshot(true)}
                >
                  <Eye size={14} color="white" />
                  <Text style={styles.buttonText}>Yes, I have one</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.outlineButton]}
                  onPress={() => setHasOwnScreenshot(false)}
                >
                  <XCircle size={14} color="white" />
                  <Text style={styles.buttonText}>No screenshot</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {hasOwnScreenshot ? 'Upload Screenshot' : 'Verify Result'}
            </Text>
            <Text style={styles.modalDescription}>
              {hasOwnScreenshot
                ? 'Upload for automatic verification'
                : 'Confirm if you agree with the result'}
            </Text>
          </View>

          {/* Match Info */}
          <View style={styles.matchInfoContainer}>
            <View style={styles.matchCenter}>
              <Text style={styles.teamsText}>
                {verificationData.homeTeam} vs {verificationData.awayTeam}
              </Text>
              <Text style={styles.scoreText}>
                {verificationData.submittedScore}
              </Text>
              <Text style={styles.opponentText}>
                by {verificationData.opponent}
              </Text>
            </View>
          </View>

          {hasOwnScreenshot ? (
            // Screenshot upload flow with counter for manual score entry
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitleSmall}>Your Result</Text>

                <View style={styles.scoreInputContainer}>
                  <View style={styles.teamInput}>
                    <Text style={styles.teamLabel}>
                      {verificationData.homeTeam}
                    </Text>
                    <Counter
                      value={homeScore}
                      onChange={setHomeScore}
                      min={0}
                      max={20}
                      style={styles.counter}
                    />
                  </View>

                  <Text style={styles.vsText}>VS</Text>

                  <View style={styles.teamInput}>
                    <Text style={styles.teamLabel}>
                      {verificationData.awayTeam}
                    </Text>
                    <Counter
                      value={awayScore}
                      onChange={setAwayScore}
                      min={0}
                      max={20}
                      style={styles.counter}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.uploadContainer}>
                  <Eye size={20} color="#9CA3AF" />
                  <Text style={styles.uploadText}>Upload your screenshot</Text>
                  <TouchableOpacity style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Choose File</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.infoBoxBlue}>
                  <AlertTriangle size={14} color="#60A5FA" />
                  <Text style={styles.infoTextBlue}>
                    AI will compare screenshots automatically
                  </Text>
                </View>
              </View>
            </>
          ) : (
            // Manual approval flow
            <View style={styles.section}>
              <View style={styles.infoBoxYellow}>
                <AlertTriangle size={14} color="#F59E0B" />
                <Text style={styles.infoTextYellow}>
                  Please verify based on your memory
                </Text>
              </View>

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[styles.button, styles.approveButton]}
                  onPress={() => handleDecision('approve')}
                  disabled={isSubmitting}
                >
                  {isSubmitting && decision === 'approve' ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <>
                      <ThumbsUp size={14} color="white" />
                      <Text style={styles.buttonText}>Approve</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.disputeButton]}
                  onPress={() => handleDecision('dispute')}
                  disabled={isSubmitting}
                >
                  {isSubmitting && decision === 'dispute' ? (
                    <ActivityIndicator color="#F87171" />
                  ) : (
                    <>
                      <ThumbsDown size={14} color="#F87171" />
                      <Text style={styles.disputeButtonText}>Dispute</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#111827',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    width: '100%',
    maxWidth: 400,
    padding: 16,
  },
  modalHeader: {
    paddingBottom: 8,
  },
  modalTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalDescription: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  matchInfoContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  matchInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tournamentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tournamentText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  deadlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.3)',
  },
  deadlineText: {
    color: '#F97316',
    fontSize: 12,
    marginLeft: 4,
  },
  matchCenter: {
    alignItems: 'center',
    marginBottom: 4,
  },
  teamsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  scoreText: {
    color: '#34D399',
    fontSize: 18,
    fontWeight: 'bold',
  },
  opponentText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  aiVerified: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 4,
  },
  aiVerifiedText: {
    color: '#34D399',
    fontSize: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  sectionTitleSmall: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  buttonGroup: {
    gap: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    height: 32,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  outlineButton: {
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  approveButton: {
    backgroundColor: '#059669',
  },
  disputeButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  disputeButtonText: {
    color: '#F87171',
    fontSize: 14,
    marginLeft: 8,
  },
  scoreInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  teamInput: {
    flex: 1,
  },
  teamLabel: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 4,
  },
  vsText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  counter: {
    backgroundColor: 'rgba(31, 41, 55, 0.3)',
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#4B5563',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginVertical: 4,
  },
  uploadButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 4,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 12,
  },
  infoBoxYellow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    borderRadius: 6,
    marginBottom: 12,
  },
  infoTextYellow: {
    color: '#F59E0B',
    fontSize: 12,
    flex: 1,
  },
  infoBoxBlue: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    borderRadius: 6,
  },
  infoTextBlue: {
    color: '#60A5FA',
    fontSize: 12,
    flex: 1,
  },
});

export default ResultVerificationModal;
