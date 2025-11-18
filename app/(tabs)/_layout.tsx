import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
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
          ),
        }}
      />

      {/* ===== EXPLORE ===== */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />

      {/* ===== PROFILE ===== */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />

      {/* ===== HIDDEN: Sayur route (accessible by push) ===== */}
      <Tabs.Screen
        name="sayur"
        options={{
          title: '',
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
