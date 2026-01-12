import React from 'react';
import BuahScreen from '../src/screens/BuahScreen';

export default function BuahRoute() {
  return <BuahScreen />;
}

export const options = {
  headerShown: true,
  headerTitle: 'Buah',
  headerTintColor: '#2E7D32',
  headerStyle: {
    backgroundColor: '#2E7D32',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
};
