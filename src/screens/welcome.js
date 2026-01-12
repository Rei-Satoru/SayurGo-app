import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeSplash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace('/onboarding'), 1400);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} style={styles.content} onPress={() => router.replace('/welcome/onboarding')}>
        <Text style={styles.logo}> <Text style={styles.logoMain}>Sayur.</Text><Text style={styles.logoAccent}>Go</Text> </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E7D32',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
  },
  logoMain: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  logoAccent: {
    color: '#FFA500',
    fontWeight: '700',
  },
});