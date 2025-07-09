
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  username: string;
  email: string;
  teamName: string;
  teamColor: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in AsyncStorage
    const loadStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const selectedTeam = await AsyncStorage.getItem('selectedTeam');
        
        if (storedUser && selectedTeam) {
          const userData = JSON.parse(storedUser);
          const teamData = JSON.parse(selectedTeam);
          setUser({
            ...userData,
            teamName: teamData.name,
            teamColor: teamData.color
          });
        } else if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading stored user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredUser();
  }, []);

  const login = async (userData: User) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('selectedTeam');
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      try {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      updateUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
