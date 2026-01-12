import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { AuthContext } from '../src/context/AuthContext'; // Sesuaikan path ini jika perlu

export default function Index() {
  const { user, isLoading } = useContext(AuthContext);

  // 1. Loading saat cek login
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  // 2. Jika SUDAH login -> Masuk ke Home (Tabs)
  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  // 3. Jika BELUM login -> Arahkan ke file 'welcome.tsx'
  return <Redirect href="/welcome" />;
}