import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cek login saat aplikasi dibuka
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user_session');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Gagal memuat data user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Fungsi Login
  const login = async (userData) => {
    setUser(userData);
    try {
      await AsyncStorage.setItem('user_session', JSON.stringify(userData));
    } catch (error) {
      console.error("Gagal menyimpan login:", error);
    }
  };

  // Fungsi Logout
  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem('user_session');
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};