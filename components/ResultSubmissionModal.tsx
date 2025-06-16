import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  Upload,
  Camera,
  Award,
  Clock,
  AlertCircle,
  Check,
} from 'lucide-react-native';
import Counter from '@/components/Counter';

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

const ResultSubmissionModal = ({
  isOpen,
  onClose,
  matchData,
}: ResultSubmissionModalProps) => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<
    'input' | 'uploading' | 'success'
  >('input');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setScreenshot(result.assets[0].uri);
    }
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

  const renderContent = () => {
    switch (submissionStep) {
      case 'uploading':
        return (
          <View style={styles.uploadingContainer}>
            <View style={styles.uploadingIcon}>
              <Upload size={24} color="white" />
            </View>
            <Text style={styles.uploadingTitle}>Processing...</Text>
            <Text style={styles.uploadingText}>Analyzing screenshot</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        );

      case 'success':
        return (
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Check size={24} color="white" />
            </View>
            <Text style={styles.successTitle}>Submitted</Text>
            <Text style={styles.successText}>Waiting for verification</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return (
          <>
            {/* Match Info */}
            <View style={styles.matchInfoContainer}>
              <View style={styles.matchInfoHeader}>
                <View style={styles.tournamentInfo}>
                  <Award size={14} color="#34D399" />
                  <Text style={styles.tournamentText}>
                    {matchData.tournament}
                  </Text>
                </View>
                <View style={styles.deadlineBadge}>
                  <Clock size={12} color="#F97316" />
                  <Text style={styles.deadlineText}>
                    {formatDeadline(matchData.deadline)}
                  </Text>
                </View>
              </View>

              <View style={styles.matchCenter}>
                <Text style={styles.teamsText}>
                  {matchData.homeTeam} vs {matchData.awayTeam}
                </Text>
              </View>
            </View>

            {/* Score Input */}
            <View style={styles.section}>
              <Text style={styles.sectionTitleSmall}>Match Result</Text>

              <View style={styles.scoreInputContainer}>
                <View style={styles.teamInput}>
                  <Text style={styles.teamLabel}>{matchData.homeTeam}</Text>
                  <Counter
                    value={homeScore}
                    onChange={setHomeScore}
                    min={0}
                    max={20}
                  />
                </View>

                <Text style={styles.vsText}>VS</Text>

                <View style={styles.teamInput}>
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
            <View style={styles.section}>
              <View style={styles.uploadHeader}>
                <Camera size={14} color="#34D399" />
                <Text style={styles.uploadTitle}>Screenshot</Text>
                <View style={styles.optionalBadge}>
                  <Text style={styles.optionalText}>Optional</Text>
                </View>
              </View>

              <Pressable style={styles.uploadContainer} onPress={pickImage}>
                {screenshot ? (
                  <View style={styles.uploadSuccess}>
                    <Check size={20} color="#34D399" />
                    <Text style={styles.uploadSuccessText}>
                      Screenshot selected
                    </Text>
                  </View>
                ) : (
                  <View style={styles.uploadPrompt}>
                    <Upload size={20} color="#9CA3AF" />
                    <Text style={styles.uploadPromptText}>
                      Upload screenshot
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={pickImage}
                >
                  <Text style={styles.uploadButtonText}>
                    {screenshot ? 'Change' : 'Choose File'}
                  </Text>
                </TouchableOpacity>
              </Pressable>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                isSubmitting && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Submitting...' : 'Submit Result'}
              </Text>
            </TouchableOpacity>
          </>
        );
    }
  };

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
            <Text style={styles.modalTitle}>Submit Result</Text>
            <Text style={styles.modalDescription}>Enter your match result</Text>
          </View>

          {renderContent()}
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
  },
  teamsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitleSmall: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  scoreInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
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
  uploadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  uploadTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  optionalBadge: {
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
  },
  optionalText: {
    color: '#34D399',
    fontSize: 12,
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#4B5563',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  uploadSuccess: {
    alignItems: 'center',
    gap: 4,
  },
  uploadSuccessText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  uploadPrompt: {
    alignItems: 'center',
    gap: 4,
  },
  uploadPromptText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  uploadButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 8,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#059669',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#374151',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  uploadingContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  uploadingIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#059669',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadingTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  uploadingText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#1F2937',
    borderRadius: 4,
    height: 4,
  },
  progressFill: {
    backgroundColor: '#059669',
    height: 4,
    borderRadius: 4,
    width: '60%',
  },
  successContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  successIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#059669',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  successTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  successText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 16,
  },
  closeButton: {
    width: '100%',
    backgroundColor: '#059669',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ResultSubmissionModal;
