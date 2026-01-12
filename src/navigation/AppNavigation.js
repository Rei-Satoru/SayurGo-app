import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
<<<<<<< HEAD
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// 👇 IMPORT SCREEN (Pastikan path folder benar)
=======
import { NavigationContainer } from '@react-navigation/native';

>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from "../screens/CartScreen";
<<<<<<< HEAD
import DetailProductScreen from '../screens/DetailProductScreen'; // Perbaiki nama/path jika perlu

// 👇 IMPORT SCREEN BARU KITA
import RiwayatPesananScreen from '../screens/RiwayatPesananScreen';
import DetailPesanan from '../screens/DetailPesanan';
import CheckOutScreen from '../screens/CheckOutScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 1. BUAT NAVIGASI TAB (MENU BAWAH)
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          height: 65,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 5,
          elevation: 5,
        },
        tabBarIcon: ({ focused }) => {
          let iconPath;

          if (route.name === 'Home') {
            iconPath = require('../../assets/icons/home.png');
          } else if (route.name === 'Explore') {
            iconPath = require('../../assets/icons/search.png'); // Ganti icon search jika ada
          } else if (route.name === 'Cart') {
            iconPath = require('../../assets/icons/cart.png');
          } else if (route.name === 'Riwayat') {
            // 👇 Icon untuk Riwayat (Ganti dengan icon pesanan/history kamu)
            iconPath = require('../../assets/icons/order.png'); 
          } else if (route.name === 'Profile') {
            iconPath = require('../../assets/icons/user.png');
          }

          // Fallback jika icon belum ada, pakai default (misal user.png) biar ga error
          if (!iconPath) iconPath = require('../../assets/icons/user.png');

          return (
            <Image
              source={iconPath}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#2E7D32' : '#9E9E9E',
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      {/* 👇 GANTI PesananScreen LAMA DENGAN RIWAYAT PESANAN BARU */}
      <Tab.Screen name="Riwayat" component={RiwayatPesananScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// 2. BUAT NAVIGASI UTAMA (STACK)
// Ini membungkus Tab + Halaman Detail (Checkout, Detail Produk, dll)
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* Menu Utama (Tab) */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Halaman Detail (Tidak ada Tab Bar di halaman ini) */}
        <Stack.Screen name="DetailProduct" component={DetailProductScreen} />
        <Stack.Screen name="Checkout" component={CheckOutScreen} />
        <Stack.Screen name="DetailPesanan" component={DetailPesanan} />
        
      </Stack.Navigator>
=======

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#2E7D32',
          tabBarInactiveTintColor: '#9E9E9E',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: 65,
            paddingBottom: 10,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: -2 },
            shadowRadius: 5,
            elevation: 5,
          },
          tabBarIcon: ({ focused }) => {
            // map route names to icon files
            let iconPath;
            if (route.name === 'Home') {
              iconPath = require('../../assets/icons/home.png');
            } else if (route.name === 'Explore') {
              // keep explore icon (if you don't have explore.png, you can reuse another icon)
              // change this path if you have a specific icon for Explore
              iconPath = require('../../assets/icons/cart.png');
            } else if (route.name === 'Cart') {
              iconPath = require('../../assets/icons/cart.png');
            } else if (route.name === 'Profile') {
              iconPath = require('../../assets/icons/user.png');
            }

            // safe fallback (avoid crash if iconPath undefined)
            if (!iconPath) return null;

            return (
              <Image
                source={iconPath}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#2E7D32' : '#9E9E9E',
                }}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
    </NavigationContainer>
  );
}