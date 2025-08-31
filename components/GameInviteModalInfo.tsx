import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';

interface GameInviteModalInfoProps {
  visible: boolean;
  onClose: () => void;
}

export const GameInviteModalInfo: React.FC<GameInviteModalInfoProps> = ({ 
  visible, 
  onClose 
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>How it works</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X color="#ffffff" size={20} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                • Game invites expire after 10 minutes
              </Text>
              <Text style={styles.infoText}>
                • Accept invites to start playing immediately
              </Text>
              <Text style={styles.infoText}>
                • Tournament invites give you ranking points
              </Text>
              <Text style={styles.infoText}>• Casual games are just for fun</Text>
            </View>
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
  infoCard: {
    backgroundColor: 'rgba(55, 65, 81, 0.3)',
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 8,
  },
});