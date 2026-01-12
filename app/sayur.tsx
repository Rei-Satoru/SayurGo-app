import React from 'react';
import SayurScreen from '../src/screens/SayurScreen';

export default function SayurRoute() {
  return <SayurScreen />;
}

export const options = {
  headerShown: true,
  headerTitle: 'Sayuran',
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
