import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X, CircleCheck as CheckCircle, Circle as XCircle, TriangleAlert as AlertTriangle, Award, Clock, Eye, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Counter } from '@/components/Counter';

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

export const ResultVerificationModal: React.FC<ResultVerificationModalProps> = ({ 
  isOpen, 
  onClose, 
  verificationData 
}) => {
  const [decision, setDecision] = useState<'approve' | 'dispute' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasOwnScreenshot, setHasOwnScreenshot] = useState<boolean | null>(null);
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
    const diffHours = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
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
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Verify Result</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X color="#9ca3af" size={20} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {/* Match Info */}
              <View style={styles.matchInfo}>
                <View style={styles.matchHeader}>
                  <View style={styles.tournamentInfo}>
                    <Award color="#22c55e" size={12} />
                    <Text style={styles.tournamentText}>{verificationData.tournament}</Text>
                  </View>
                  <Badge style={styles.deadlineBadge}>
                    <Clock color="#f59e0b" size={10} />
                    <Text style={styles.deadlineText}>{formatDeadline(verificationData.deadline)}</Text>
                  </Badge>
                </View>
                
                <Text style={styles.matchTeams}>
                  {verificationData.homeTeam} vs {verificationData.awayTeam}
                </Text>
                <Text style={styles.submittedScore}>
                  {verificationData.submittedScore}
                </Text>
                <Text style={styles.submittedBy}>
                  by {verificationData.opponent}
                </Text>

                {verificationData.hasScreenshot && verificationData.aiConfidence && (
                  <View style={styles.aiVerification}>
                    <CheckCircle color="#22c55e" size={12} />
                    <Text style={styles.aiVerificationText}>
                      AI Verified ({verificationData.aiConfidence}%)
                    </Text>
                  </View>
                )}
              </View>

              {/* Screenshot Question */}
              <View style={styles.screenshotQuestion}>
                <Text style={styles.questionTitle}>Do you have a screenshot?</Text>
                
                <View style={styles.questionOptions}>
                  <Button
                    onPress={() => setHasOwnScreenshot(true)}
                    variant="outline"
                    style={styles.questionButton}
                  >
                    <Eye color="#ffffff" size={12} />
                    <Text style={styles.questionButtonText}>Yes, I have one</Text>
                  </Button>
                  
                  <Button
                    onPress={() => setHasOwnScreenshot(false)}
                    variant="outline"
                    style={styles.questionButton}
                  >
                    <XCircle color="#ffffff" size={12} />
                    <Text style={styles.questionButtonText}>No screenshot</Text>
                  </Button>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {hasOwnScreenshot ? 'Upload Screenshot' : 'Verify Result'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color="#9ca3af" size={20} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Match Info */}
            <View style={styles.matchInfo}>
              <Text style={styles.matchTeams}>
                {verificationData.homeTeam} vs {verificationData.awayTeam}
              </Text>
              <Text style={styles.submittedScore}>
                {verificationData.submittedScore}
              </Text>
              <Text style={styles.submittedBy}>
                by {verificationData.opponent}
              </Text>
            </View>

            {hasOwnScreenshot ? (
              // Screenshot upload flow with counter for manual score entry
              <>
                <View style={styles.scoreSection}>
                  <Text style={styles.sectionTitle}>Your Result</Text>
                  
                  <View style={styles.scoreGrid}>
                    <View style={styles.scoreInput}>
                      <Text style={styles.teamLabel}>{verificationData.homeTeam}</Text>
                      <Counter
                        value={homeScore}
                        onChange={setHomeScore}
                        min={0}
                        max={20}
                      />
                    </View>
                    
                    <View style={styles.vsContainer}>
                      <Text style={styles.vsText}>VS</Text>
                    </View>
                    
                    <View style={styles.scoreInput}>
                      <Text style={styles.teamLabel}>{verificationData.awayTeam}</Text>
                      <Counter
                        value={awayScore}
                        onChange={setAwayScore}
                        min={0}
                        max={20}
                      />
                    </View>
                  </View>
                </View>
                
                <View style={styles.uploadSection}>
                  <TouchableOpacity style={styles.uploadArea}>
                    <Eye color="#9ca3af" size={20} />
                    <Text style={styles.uploadPromptText}>Upload your screenshot</Text>
                  </TouchableOpacity>
                  
                  <View style={styles.aiNote}>
                    <AlertTriangle color="#3b82f6" size={12} />
                    <Text style={styles.aiNoteText}>
                      AI will compare screenshots automatically
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              // Manual approval flow
              <View style={styles.manualVerification}>
                <View style={styles.warningNote}>
                  <AlertTriangle color="#f59e0b" size={12} />
                  <Text style={styles.warningNoteText}>
                    Please verify based on your memory
                  </Text>
                </View>

                <View style={styles.decisionButtons}>
                  <Button
                    onPress={() => handleDecision('approve')}
                    disabled={isSubmitting}
                    style={styles.approveButton}
                  >
                    <ThumbsUp color="#ffffff" size={12} />
                    <Text style={styles.buttonText}>
                      {isSubmitting && decision === 'approve' ? 'Approving...' : 'Approve'}
                    </Text>
                  </Button>
                  
                  <Button
                    onPress={() => handleDecision('dispute')}
                    disabled={isSubmitting}
                    variant="outline"
                    style={styles.disputeButton}
                  >
                    <ThumbsDown color="#ef4444" size={12} />
                    <Text style={[styles.buttonText, styles.disputeButtonText]}>
                      {isSubmitting && decision === 'dispute' ? 'Disputing...' : 'Dispute'}
                    </Text>
                  </Button>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#1f2937',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  matchInfo: {
    backgroundColor: 'rgba(55, 65, 81, 0.3)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  tournamentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tournamentText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  deadlineBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  deadlineText: {
    color: '#f59e0b',
    fontSize: 9,
    fontFamily: 'Inter-SemiBold',
  },
  matchTeams: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  submittedScore: {
    color: '#22c55e',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  submittedBy: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  aiVerification: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  aiVerificationText: {
    color: '#22c55e',
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  screenshotQuestion: {
    marginBottom: 20,
  },
  questionTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  questionOptions: {
    gap: 8,
  },
  questionButton: {
    backgroundColor: '#374151',
    borderColor: '#6b7280',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  questionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  scoreSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  scoreGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scoreInput: {
    flex: 1,
    alignItems: 'center',
  },
  teamLabel: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
    textAlign: 'center',
  },
  vsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadArea: {
    borderWidth: 1,
    borderColor: '#6b7280',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  uploadPromptText: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  aiNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  aiNoteText: {
    color: '#3b82f6',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  manualVerification: {
    marginBottom: 20,
  },
  warningNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    marginBottom: 16,
  },
  warningNoteText: {
    color: '#f59e0b',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  decisionButtons: {
    gap: 8,
  },
  approveButton: {
    backgroundColor: '#22c55e',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  disputeButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  disputeButtonText: {
    color: '#ef4444',
  },
});