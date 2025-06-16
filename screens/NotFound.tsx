import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotFound = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Oops! Page not found</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.link}
        >
          <Text style={styles.linkText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6', // bg-gray-100 equivalent
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36, // text-4xl equivalent
    fontWeight: 'bold',
    marginBottom: 16, // mb-4 equivalent
  },
  subtitle: {
    fontSize: 20, // text-xl equivalent
    color: '#4b5563', // text-gray-600 equivalent
    marginBottom: 16, // mb-4 equivalent
  },
  link: {
    marginTop: 8,
  },
  linkText: {
    color: '#3b82f6', // text-blue-500 equivalent
    textDecorationLine: 'underline',
  },
});

export default NotFound;
