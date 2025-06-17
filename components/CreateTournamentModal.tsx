import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  X,
  Trophy,
  Users,
  Calendar,
  Settings,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react-native';

interface CreateTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTournament: (tournament: any) => void;
}

interface Step {
  id: string;
  title: string;
}

const CreateTournamentModal = ({
  isOpen,
  onClose,
  onCreateTournament,
}: CreateTournamentModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tournamentData, setTournamentData] = useState({
    name: '',
    type: '',
    maxParticipants: 8,
    matchDays: [] as string[],
    description: '',
  });

  const steps: Step[] = [
    { id: 'type', title: 'Type' },
    { id: 'settings', title: 'Settings' },
    { id: 'schedule', title: 'Schedule' },
    { id: 'review', title: 'Review' },
  ];

  const tournamentTypes = [
    { id: 'league', name: 'League', description: 'Round-robin format' },
    { id: 'knockout', name: 'Knockout', description: 'Single elimination' },
  ];

  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const participantOptions = [4, 6, 8, 10, 12, 16, 20];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTypeSelect = (type: string) => {
    setTournamentData({ ...tournamentData, type });
  };

  const handleMatchDayToggle = (day: string) => {
    const updatedDays = tournamentData.matchDays.includes(day)
      ? tournamentData.matchDays.filter((d) => d !== day)
      : [...tournamentData.matchDays, day];
    setTournamentData({ ...tournamentData, matchDays: updatedDays });
  };

  const handleCreate = () => {
    onCreateTournament(tournamentData);
    onClose();
    setCurrentStep(1);
    setTournamentData({
      name: '',
      type: '',
      maxParticipants: 8,
      matchDays: [],
      description: '',
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return tournamentData.type !== '';
      case 2:
        return tournamentData.name.trim() !== '';
      case 3:
        return tournamentData.matchDays.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const StepperComponent = () => (
    <View style={styles.stepperContainer}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <View style={styles.stepContainer}>
            <View
              style={[
                styles.stepCircle,
                currentStep > index + 1 && styles.completedStep,
                currentStep === index + 1 && styles.activeStep,
              ]}
            >
              {currentStep > index + 1 ? (
                <Text style={styles.stepText}>✓</Text>
              ) : (
                <Text style={styles.stepText}>{index + 1}</Text>
              )}
            </View>
            <Text
              style={[
                styles.stepTitle,
                currentStep === index + 1 && styles.activeStepTitle,
              ]}
            >
              {step.title}
            </Text>
          </View>
          {index < steps.length - 1 && <View style={styles.stepLine} />}
        </React.Fragment>
      ))}
    </View>
  );

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      onRequestClose={onClose}
      transparent={false}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Trophy size={20} color="#34D399" />
              <Text style={styles.title}>Create Tournament</Text>
            </View>
          </View>

          {/* Stepper */}
          <StepperComponent />

          {/* Step Content */}
          <ScrollView style={styles.content}>
            {currentStep === 1 && (
              <View style={styles.stepContent}>
                <Text style={styles.stepHeading}>Tournament Type</Text>
                <View style={styles.typeContainer}>
                  {tournamentTypes.map((type) => (
                    <TouchableOpacity
                      key={type.id}
                      onPress={() => handleTypeSelect(type.id)}
                      style={[
                        styles.typeButton,
                        tournamentData.type === type.id && styles.selectedType,
                      ]}
                    >
                      <View style={styles.typeTextContainer}>
                        <Text style={styles.typeName}>{type.name}</Text>
                        <Text style={styles.typeDescription}>
                          {type.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {currentStep === 2 && (
              <View style={styles.stepContent}>
                <Text style={styles.stepHeading}>Tournament Settings</Text>
                <View style={styles.settingsContainer}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Tournament Name</Text>
                    <TextInput
                      value={tournamentData.name}
                      onChangeText={(text) =>
                        setTournamentData({ ...tournamentData, name: text })
                      }
                      placeholder="Enter tournament name"
                      placeholderTextColor="#6B7280"
                      style={styles.input}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Maximum Participants</Text>
                    <View style={styles.participantGrid}>
                      {participantOptions.map((option) => (
                        <TouchableOpacity
                          key={option}
                          onPress={() =>
                            setTournamentData({
                              ...tournamentData,
                              maxParticipants: option,
                            })
                          }
                          style={[
                            styles.participantButton,
                            tournamentData.maxParticipants === option &&
                              styles.selectedParticipant,
                          ]}
                        >
                          <Text
                            style={[
                              styles.participantText,
                              tournamentData.maxParticipants === option &&
                                styles.selectedParticipantText,
                            ]}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            )}

            {currentStep === 3 && (
              <View style={styles.stepContent}>
                <Text style={styles.stepHeading}>Match Schedule</Text>
                <Text style={styles.scheduleSubtitle}>
                  Select the days when matches can be played
                </Text>

                <View style={styles.daysGrid}>
                  {weekDays.map((day) => (
                    <TouchableOpacity
                      key={day}
                      onPress={() => handleMatchDayToggle(day)}
                      style={[
                        styles.dayButton,
                        tournamentData.matchDays.includes(day) &&
                          styles.selectedDay,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          tournamentData.matchDays.includes(day) &&
                            styles.selectedDayText,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {tournamentData.matchDays.length > 0 && (
                  <View style={styles.selectedDaysContainer}>
                    <Text style={styles.selectedDaysLabel}>Selected days:</Text>
                    <View style={styles.selectedDaysList}>
                      {tournamentData.matchDays.map((day) => (
                        <View key={day} style={styles.dayBadge}>
                          <Text style={styles.dayBadgeText}>{day}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}

            {currentStep === 4 && (
              <View style={styles.stepContent}>
                <Text style={styles.stepHeading}>Review & Create</Text>
                <View style={styles.reviewContainer}>
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Name:</Text>
                    <Text style={styles.reviewValue}>
                      {tournamentData.name}
                    </Text>
                  </View>
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Type:</Text>
                    <Text style={styles.reviewValue}>
                      {tournamentData.type.charAt(0).toUpperCase() +
                        tournamentData.type.slice(1)}
                    </Text>
                  </View>
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Max Players:</Text>
                    <Text style={styles.reviewValue}>
                      {tournamentData.maxParticipants}
                    </Text>
                  </View>
                  <View style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>Match Days:</Text>
                    <Text style={styles.reviewValue}>
                      {tournamentData.matchDays.length} days
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Navigation Buttons */}
          <View style={styles.navigation}>
            <TouchableOpacity
              onPress={handlePrevious}
              disabled={currentStep === 1}
              style={[
                styles.navButton,
                styles.prevButton,
                currentStep === 1 && styles.disabledButton,
              ]}
            >
              <ArrowLeft
                size={16}
                color={currentStep === 1 ? '#6B7280' : '#D1D5DB'}
              />
              <Text
                style={[
                  styles.navButtonText,
                  currentStep === 1 && styles.disabledButtonText,
                ]}
              >
                Previous
              </Text>
            </TouchableOpacity>

            {currentStep < 4 ? (
              <TouchableOpacity
                onPress={handleNext}
                disabled={!canProceed()}
                style={[
                  styles.navButton,
                  styles.nextButton,
                  !canProceed() && styles.disabledButton,
                ]}
              >
                <Text
                  style={[
                    styles.navButtonText,
                    styles.nextButtonText,
                    !canProceed() && styles.disabledButtonText,
                  ]}
                >
                  Next
                </Text>
                <ArrowRight
                  size={16}
                  color={!canProceed() ? '#6B7280' : 'white'}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleCreate}
                style={[styles.navButton, styles.createButton]}
              >
                <Text style={[styles.navButtonText, styles.createButtonText]}>
                  Create Tournament
                </Text>
                <Trophy size={16} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1C1C1E',
  },
  header: {
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3A3A3C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    color: '#D1D5DB',
    fontSize: 12,
    fontWeight: '600',
  },
  stepTitle: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
  },
  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3A3A3C',
    marginHorizontal: 4,
  },
  activeStep: {
    backgroundColor: '#34D399',
  },
  activeStepTitle: {
    color: '#34D399',
  },
  completedStep: {
    backgroundColor: '#34D399',
  },
  content: {
    flex: 1,
    marginBottom: 16,
  },
  stepContent: {
    marginBottom: 24,
  },
  stepHeading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  typeContainer: {
    gap: 12,
  },
  typeButton: {
    backgroundColor: '#3A3A3C',
    borderWidth: 1,
    borderColor: '#3A3A3C',
    borderRadius: 8,
    padding: 16,
  },
  selectedType: {
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    borderColor: '#34D399',
  },
  typeTextContainer: {},
  typeName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  typeDescription: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  settingsContainer: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#3A3A3C',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  participantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  participantButton: {
    width: '22%',
    backgroundColor: '#3A3A3C',
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedParticipant: {
    backgroundColor: '#34D399',
  },
  participantText: {
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedParticipantText: {
    color: 'white',
  },
  scheduleSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 16,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayButton: {
    width: '48%',
    backgroundColor: '#3A3A3C',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: '#34D399',
  },
  dayText: {
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: '600',
  },
  selectedDaysContainer: {
    marginTop: 16,
  },
  selectedDaysLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
  selectedDaysList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayBadge: {
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
  },
  dayBadgeText: {
    color: '#34D399',
    fontSize: 12,
  },
  reviewContainer: {
    backgroundColor: '#3A3A3C',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewLabel: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  reviewValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#3A3A3C',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  prevButton: {
    backgroundColor: '#3A3A3C',
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  nextButton: {
    backgroundColor: '#34D399',
  },
  createButton: {
    backgroundColor: '#34D399',
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  nextButtonText: {
    color: 'white',
  },
  createButtonText: {
    color: 'white',
  },
  disabledButtonText: {
    color: '#6B7280',
  },
});

export default CreateTournamentModal;
