import React from 'react';
import SayurScreen from '../../src/screens/SayurScreen';

export default function SayurRoute() {
  return <SayurScreen />;
}

// Hide this route from the bottom tab bar while keeping it routable
export const options = {
  tabBarButton: () => null,
};
