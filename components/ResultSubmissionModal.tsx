import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { X, Upload, Camera, Award, Clock, CircleAlert as AlertCircle, Check } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Counter } from '@/components/Counter';

interface ResultSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchData: {
    opponent: string;
    tournament: string;
    deadline: string;
    homeTeam: string;
    awayTeam: string;
  };
}

export const ResultSubmissionModal: React.FC<ResultSubmissionModalProps> = ({ 
  isOpen, 
  onClose, 
  matchData 
}) => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<'input' | 'uploading' | 'success'>('input');

  const handleFileUpload = () => {
    // Simulate file upload
    setScreenshot('screenshot.jpg');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionStep('uploading');
    
    // Simulate API call and processing
    setTimeout(() => {
      setSubmissionStep('success');
      setIsSubmitting(false);
    }, 3000);
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

  const renderContent = () => {
    switch (submissionStep) {
      case 'uploading':
        return (
          <View style={styles.statusContainer}>
            <View style={styles.statusIcon}>
              <Upload color="#ffffff" size={24} />
            </View>
            <Text style={styles.statusTitle}>Processing...</Text>
            <Text style={styles.statusSubtitle}>Analyzing screenshot</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        );

      case 'success':
        return (
          <View style={styles.statusContainer}>
            <View style={[styles.statusIcon, styles.successIcon]}>
              <Check color="#ffffff" size={24} />
            </View>
            <Text style={styles.statusTitle}>Submitted</Text>
            <Text style={styles.statusSubtitle}>Waiting for verification</Text>
            <Button onPress={onClose} style={styles.closeButton}>
              Close
            </Button>
          </View>
        );

      default:
        return (
          <>
            {/* Match Info */}
            <View style={styles.matchInfo}>
              <View style={styles.matchHeader}>
                <View style={styles.tournamentInfo}>
                  <Award color="#22c55e" size={12} />
                  <Text style={styles.tournamentText}>{matchData.tournament}</Text>
                </View>
                <Badge style={styles.deadlineBadge}>
                  <Clock color="#f59e0b" size={10} />
                  <Text style={styles.deadlineText}>{formatDeadline(matchData.deadline)}</Text>
                </Badge>
              </View>
              
              <Text style={styles.matchTeams}>
                {matchData.homeTeam} vs {matchData.awayTeam}
              </Text>
            </View>

            {/* Score Input */}
            <View style={styles.scoreSection}>
              <Text style={styles.sectionTitle}>Match Result</Text>
              
              <View style={styles.scoreGrid}>
                <View style={styles.scoreInput}>
                  <Text style={styles.teamLabel}>{matchData.homeTeam}</Text>
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
                  <Text style={styles.teamLabel}>{matchData.awayTeam}</Text>
                  <Counter
                    value={awayScore}
                    onChange={setAwayScore}
                    min={0}
                    max={20}
                  />
                </View>
              </View>
            </View>

            {/* Screenshot Upload */}
            <View style={styles.uploadSection}>
              <View style={styles.uploadHeader}>
                <Camera color="#22c55e" size={12} />
                <Text style={styles.sectionTitle}>Screenshot</Text>
                <Badge variant="outline" style={styles.optionalBadge}>
                  Optional
                </Badge>
              </View>
              
              <TouchableOpacity style={styles.uploadArea} onPress={handleFileUpload}>
                {screenshot ? (
                  <View style={styles.uploadSuccess}>
                    <Check color="#22c55e" size={20} />
                    <Text style={styles.uploadSuccessText}>{screenshot}</Text>
                  </View>
                ) : (
                  <View style={styles.uploadPrompt}>
                    <Upload color="#9ca3af" size={20} />
                    <Text style={styles.uploadPromptText}>Upload screenshot</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <Button
              onPress={handleSubmit}
              disabled={isSubmitting}
              style={styles.submitButton}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Result'}
            </Button>
          </>
        );
    }
  };

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
            <Text style={styles.title}>Submit Result</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color="#9ca3af" size={20} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {renderContent()}
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
  },
  matchHeader: {
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
    textAlign: 'center',
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
  uploadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  optionalBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  uploadArea: {
    borderWidth: 1,
    borderColor: '#6b7280',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  uploadPrompt: {
    alignItems: 'center',
    gap: 8,
  },
  uploadPromptText: {
    color: '#9ca3af',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  uploadSuccess: {
    alignItems: 'center',
    gap: 8,
  },
  uploadSuccessText: {
    color: '#22c55e',
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  submitButton: {
    backgroundColor: '#22c55e',
    marginTop: 8,
  },
  statusContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  successIcon: {
    backgroundColor: '#22c55e',
  },
  statusTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  statusSubtitle: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#22c55e',
  },
});