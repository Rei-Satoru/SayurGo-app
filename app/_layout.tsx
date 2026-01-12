import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react"; // 👈 Import React Hooks
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// 1. IMPORT AUTH (Provider & Context)
// Pastikan path ini sesuai dengan struktur folder Anda
import { AuthContext, AuthProvider } from "@/src/context/AuthContext";

// 2. IMPORT PROVIDER LAINNYA
import { CartProvider } from "@/src/context/CartContext";
import { FavoriteProvider } from "@/src/context/FavoriteContext";
import { PesananProvider } from "@/src/context/PesananContext";
import { PromoProvider } from "@/src/context/PromoContext";

// Redux Setup
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../src/store/index"; // Cek path ini apakah benar "../src" atau "@/src"

export const unstable_settings = {
  anchor: "(tabs)",
};

// Komponen Loading Sederhana
const LoadingMarkup = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#fff' }}>
    <ActivityIndicator size="large" color="#2ecc71" />
  </View>
);

// 👇 KOMPONEN UTAMA (LOGIKA NAVIGASI)
// Kita pisahkan ini agar bisa menggunakan useContext(AuthContext)
function MainLayout() {
  const colorScheme = useColorScheme();
  const { isLoading, user } = useContext(AuthContext); // Ambil status loading & user
  const router = useRouter();
  const segments = useSegments();

  // Efek untuk mengecek status login (Optional: Auto Redirect)
  // Jika Anda ingin redirect otomatis, uncomment kode di bawah:
  /*
  useEffect(() => {
    if (isLoading) return;
    const inAuthGroup = segments[0] === '(tabs)';
    
    if (!user && inAuthGroup) {
      // Jika belum login tapi coba akses tabs, tendang ke login
      router.replace('/login');
    } else if (user && segments[0] === 'login') {
      // Jika sudah login tapi ada di halaman login, tendang ke tabs
      router.replace('/(tabs)');
    }
  }, [user, isLoading, segments]);
  */

  // 🛑 TAHAN DULU: Jika sedang memuat data login (AsyncStorage), tampilkan Loading
  if (isLoading) {
    return <LoadingMarkup />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Pastikan nama screen sesuai dengan nama file di folder app */}
        <Stack.Screen name="index" /> 
        <Stack.Screen name="welcome" />
        <Stack.Screen name="welcome/onboarding" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="cart" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="voucher" />
        <Stack.Screen name="detailproduct" />
        <Stack.Screen name="detailulasan" />
        <Stack.Screen name="lacak" />
        <Stack.Screen name="detailpesanan" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// 👇 ROOT LAYOUT (TEMPAT MENUMPUK PROVIDER)
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={<LoadingMarkup />} persistor={persistor}>
          
          {/* URUTAN PROVIDER */}
          <AuthProvider>
            <CartProvider> 
              <FavoriteProvider>
                <PromoProvider>
                  <PesananProvider>
                    
                    {/* Panggil MainLayout di sini */}
                    <MainLayout />

                  </PesananProvider>
                </PromoProvider>
              </FavoriteProvider>
            </CartProvider> 
          </AuthProvider>

        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}