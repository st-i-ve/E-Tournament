import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { X, Trophy, Users, Calendar } from 'lucide-react-native';
import { Button } from '@/components/ui/button';

interface CreateTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTournament: (tournamentData: any) => void;
}

export const CreateTournamentModal: React.FC<CreateTournamentModalProps> = ({
  isOpen,
  onClose,
  onCreateTournament,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'league',
    maxParticipants: '8',
    description: '',
  });

  const handleCreate = () => {
    if (formData.name.trim()) {
      onCreateTournament({
        ...formData,
        maxParticipants: parseInt(formData.maxParticipants),
      });
      setFormData({
        name: '',
        type: 'league',
        maxParticipants: '8',
        description: '',
      });
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
            <View style={styles.headerLeft}>
              <Trophy color="#22c55e" size={20} />
              <Text style={styles.title}>Create Tournament</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color="#9ca3af" size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.field}>
              <Text style={styles.label}>Tournament Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Enter tournament name"
                placeholderTextColor="#6b7280"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.typeSelector}>
                <TouchableOpacity
                  style={[
                    styles.typeOption,
                    formData.type === 'league' && styles.typeOptionActive,
                  ]}
                  onPress={() => setFormData({ ...formData, type: 'league' })}
                >
                  <Text style={[
                    styles.typeOptionText,
                    formData.type === 'league' && styles.typeOptionTextActive,
                  ]}>
                    League
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeOption,
                    formData.type === 'knockout' && styles.typeOptionActive,
                  ]}
                  onPress={() => setFormData({ ...formData, type: 'knockout' })}
                >
                  <Text style={[
                    styles.typeOptionText,
                    formData.type === 'knockout' && styles.typeOptionTextActive,
                  ]}>
                    Knockout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Max Participants</Text>
              <TextInput
                style={styles.input}
                value={formData.maxParticipants}
                onChangeText={(text) => setFormData({ ...formData, maxParticipants: text })}
                placeholder="8"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Description (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="Tournament description..."
                placeholderTextColor="#6b7280"
                multiline
                numberOfLines={3}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button
              onPress={onClose}
              variant="ghost"
              style={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              onPress={handleCreate}
              style={styles.createButton}
            >
              Create Tournament
            </Button>
          </View>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  typeOption: {
    flex: 1,
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  typeOptionActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  typeOptionText: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  typeOptionTextActive: {
    color: '#ffffff',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  createButton: {
    flex: 1,
    backgroundColor: '#22c55e',
  },
});