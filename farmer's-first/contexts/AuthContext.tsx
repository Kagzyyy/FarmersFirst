import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (name: string, farmId: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, contact: string, password: string) => Promise<string>;
  logout: () => void;
  updateProfilePic: (imageData: string) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('farmerUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('farmerUser');
    }
  }, []);

  const login = useCallback(async (name: string, farmId: string, password: string): Promise<boolean> => {
    // In a real app, this would be a network request
    // Here we simulate checking stored credentials
    console.log(`Attempting login for FarmId: ${farmId}`);
    try {
        const storedUsers = JSON.parse(localStorage.getItem('farmerUsers') || '{}');
        const userData = storedUsers[farmId];
        if (userData && userData.name === name && userData.password === password) {
            const loggedInUser: User = {
                farmId: farmId,
                name: userData.name,
                email: userData.email,
                contactNumber: userData.contactNumber,
                profilePic: userData.profilePic,
            };
            localStorage.setItem('farmerUser', JSON.stringify(loggedInUser));
            setUser(loggedInUser);
            return true;
        }
    } catch(error) {
        console.error("Login failed", error);
    }
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, contact: string, password: string): Promise<string> => {
    // Simulate API call and FarmId generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    const farmId = `FM${Math.floor(1000 + Math.random() * 9000)}`;
    const newUserRegistration = { name, email, contactNumber: contact, password, profilePic: null };
    
    try {
        const storedUsers = JSON.parse(localStorage.getItem('farmerUsers') || '{}');
        storedUsers[farmId] = newUserRegistration;
        localStorage.setItem('farmerUsers', JSON.stringify(storedUsers));
    } catch(error) {
        console.error("Registration failed", error);
        throw new Error("Could not save user data.");
    }

    return farmId;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('farmerUser');
  }, []);

  const updateProfilePic = useCallback((imageData: string) => {
    if (!user) return;

    const updatedUser = { ...user, profilePic: imageData };
    setUser(updatedUser);

    localStorage.setItem('farmerUser', JSON.stringify(updatedUser));

    try {
        const storedUsers = JSON.parse(localStorage.getItem('farmerUsers') || '{}');
        if (storedUsers[user.farmId]) {
            storedUsers[user.farmId].profilePic = imageData;
            localStorage.setItem('farmerUsers', JSON.stringify(storedUsers));
        }
    } catch (error) {
        console.error("Failed to update profile picture in master user list", error);
    }
  }, [user]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    if (!user) {
        return { success: false, message: 'No user is logged in.' };
    }

    try {
        const storedUsers = JSON.parse(localStorage.getItem('farmerUsers') || '{}');
        const userData = storedUsers[user.farmId];

        if (userData && userData.password === currentPassword) {
            // Password matches, update it
            userData.password = newPassword;
            storedUsers[user.farmId] = userData;
            localStorage.setItem('farmerUsers', JSON.stringify(storedUsers));
            return { success: true, message: 'Password updated successfully!' };
        } else {
            // Password does not match
            return { success: false, message: 'Incorrect current password.' };
        }
    } catch (error) {
        console.error("Failed to change password", error);
        return { success: false, message: 'An error occurred while changing the password.' };
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfilePic, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};