import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
<<<<<<< HEAD
import { Image } from 'react-native';
=======
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84

export default function TabLayout() {
  return (
    <Tabs
<<<<<<< HEAD
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#C8E6C9',
        tabBarStyle: {
          backgroundColor: '#2E7D32',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          height: 65,
          paddingBottom: 8,
        },
      }}
    >
      {/* ===== BERANDA ===== */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
=======
        screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff', // active icons/labels in white since footer is dark
        tabBarInactiveTintColor: '#C8E6C9',
        tabBarStyle: {
          backgroundColor: '#2E7D32',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          height: 65,
          paddingBottom: 8,
          paddingHorizontal: 18,
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: 'center',
        },
      }}
    >
      {/* ===== HOME ===== */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
          ),
        }}
      />

<<<<<<< HEAD
      {/* ===== CARI ===== */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Cari',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
=======
      {/* ===== EXPLORE ===== */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
          ),
        }}
      />

<<<<<<< HEAD
      {/* ===== Riwayat Pesanan ===== */}
      <Tabs.Screen
        name="pesanan"
        options={{
          title: 'Pesanan',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/images/pesanan.png')}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
=======
      {/* ===== PROFILE ===== */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
          ),
        }}
      />

<<<<<<< HEAD
      {/* ===== AKUN / PROFILE ===== */}
      <Tabs.Screen
        name="profile"  // Pastikan nama filenya 'profile.js'
        options={{
          title: 'Akun',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
=======
      {/* ===== HIDDEN: Sayur route (accessible by push) ===== */}
      <Tabs.Screen
        name="sayur"
        options={{
          title: '',
          tabBarButton: () => null,
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
        }}
      />
    </Tabs>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
