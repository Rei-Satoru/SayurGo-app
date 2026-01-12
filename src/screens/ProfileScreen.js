import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// Import Context
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { FavoriteContext } from "../context/FavoriteContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { user: userContext, logout: contextLogout } = useContext(AuthContext);
  const pick = (...values) => values.find((v) => v !== undefined && v !== null && String(v).trim() !== "");

  const pickFrom = (obj, paths = [], keyRegexes = []) => {
    const getByPath = (o, path) => {
      if (!o || !path) return undefined;
      return path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), o);
    };

    const byPaths = pick(...paths.map((p) => getByPath(obj, p)));
    if (byPaths !== undefined) return byPaths;

    if (!obj || typeof obj !== 'object') return undefined;

    for (const [k, v] of Object.entries(obj)) {
      if (keyRegexes.some((r) => r.test(k)) && pick(v) !== undefined) return v;
    }
    for (const [, v] of Object.entries(obj)) {
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        for (const [k2, v2] of Object.entries(v)) {
          if (keyRegexes.some((r) => r.test(k2)) && pick(v2) !== undefined) return v2;
        }
      }
    }
    return undefined;
  };
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cart } = useContext(CartContext) || { cart: [] };
  const cartCount = cart?.length || 0;
  const favoriteContext = useContext(FavoriteContext);
  const { favorites, toggleFavorite } = favoriteContext || { favorites: [], toggleFavorite: () => {} };

  // 👇 PERBAIKAN UTAMA DI SINI (LOGIKA PENGAMBILAN DATA)
  const fetchUserProfile = async () => {
    try {
      setLoading(true);

      // Ambil data user terakhir dari storage (biasanya hasil dari DB saat login)
      let storedUserData = null;
      const rawUserData = await AsyncStorage.getItem('userData');
      if (rawUserData) {
        try {
          storedUserData = JSON.parse(rawUserData);
        } catch (e) {
          console.log("Gagal parse userData:", e);
        }
      }
      
      // 1. Coba ambil token dari Context
      let token = pick(userContext?.token);

      // 2. Jika di Context kosong, cari di storage (utama: user_session, fallback: userToken)
      if (!token) {
        const storedSession = await AsyncStorage.getItem('user_session');
        if (storedSession) {
          try {
            const parsed = JSON.parse(storedSession);
            token = pick(parsed?.token);
          } catch (e) {
            console.log("Gagal parse user_session:", e);
          }
        }
      }

      if (!token) {
        token = await AsyncStorage.getItem('userToken');
      }

      console.log("Token yang dipakai:", token); 

      if (!token) { 
        console.log("Token benar-benar tidak ada, user dianggap belum login.");
        setLoading(false); 
        return; 
      }

      const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:FQ41T6Ks/auth/me";
      
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("✅ DATA DARI DATABASE:", response.data); 
      let merged = { ...(storedUserData || {}), ...(response.data || {}) };

      const hasProfileFields = (obj) => {
        const nama = pickFrom(obj, ['nama', 'name', 'full_name', 'nama_lengkap', 'nama_pengguna'], [/^nama/i, /full/i, /name/i]);
        const telepon = pickFrom(
          obj,
          ['no_telepon', 'phone', 'phone_number', 'no_hp', 'no_telp', 'no_telpon', 'telepon', 'nomor_telepon'],
          [/telepon/i, /telp/i, /telpon/i, /phone/i, /hp/i]
        );
        const alamat = pickFrom(obj, ['alamat', 'address', 'alamat_rumah', 'alamat_pengiriman'], [/alamat/i, /address/i]);
        return Boolean(pick(nama) && pick(telepon) && pick(alamat));
      };

      const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:FQ41T6Ks";
      const headers = { Authorization: `Bearer ${token}` };
      const tryGet = async (url) => {
        try {
          const res = await axios.get(url, { headers });
          return res?.data;
        } catch {
          return null;
        }
      };

      if (!hasProfileFields(merged)) {
        const userId = pick(merged?.id, merged?.user_id, storedUserData?.id, userContext?.id);
        const candidates = [
          `${BASE_URL}/users/me`,
          `${BASE_URL}/user/me`,
          userId ? `${BASE_URL}/users/${userId}` : null,
          userId ? `${BASE_URL}/user/${userId}` : null,
        ].filter(Boolean);

        for (const url of candidates) {
          const data = await tryGet(url);
          if (data) merged = { ...merged, ...data };
          if (hasProfileFields(merged)) break;
        }
      }

      setProfileData(merged);

    } catch (error) {
      console.error("❌ GAGAL AMBIL DATA:", error.response ? error.response.data : error.message);
      // Jika gagal, pakai data userContext sebagai cadangan
      try {
        const rawUserData = await AsyncStorage.getItem('userData');
        const storedUserData = rawUserData ? JSON.parse(rawUserData) : null;
        setProfileData({ ...(storedUserData || {}), ...(userContext || {}) });
      } catch {
        setProfileData(userContext);
      }
    } finally {
      setLoading(false);
    }
  };

  // Panggil fungsi setiap kali layar dibuka
  useFocusEffect(useCallback(() => { fetchUserProfile(); }, [userContext]));

  const getAvatarUri = () => {
    if (profileData?.foto_profil?.url) return profileData.foto_profil.url;
    if (profileData?.foto) return profileData.foto;
    return "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  };

  // LOGIKA KELUAR (LOGOUT)
  const performLogout = async () => {
    try {
        if(contextLogout) await contextLogout();
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('user_session');
        router.replace("/welcome"); 
    } catch (e) {
        console.error(e);
        router.replace("/login");
    }
  };

  // PENANGANAN TOMBOL LOGOUT
  const handleLogout = () => {
    if (Platform.OS === 'web') {
        const yakin = window.confirm("Apakah Anda yakin ingin keluar?");
        if (yakin) performLogout();
    } else {
        Alert.alert(
            "Keluar Akun",
            "Apakah Anda yakin ingin keluar?",
            [
                { text: "Batal", style: "cancel" },
                { text: "Keluar", style: "destructive", onPress: performLogout }
            ]
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.account}>Akun</Text>
          <TouchableOpacity onPress={() => router.push("/cart")} style={styles.headerIcon}>
            <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoRow}>
          {loading ? (
            <ActivityIndicator color="#fff" style={{ marginRight: 20 }} />
          ) : (
            <View style={styles.userInfo}>
              <Image source={{ uri: getAvatarUri() }} style={styles.avatar} />
              <View>
                {/* TAMPILKAN NAMA (Prioritas: Database -> Context -> Default) */}
                <Text style={styles.name}>
                    {pickFrom(
                      profileData || userContext,
                      ['nama', 'name', 'full_name', 'nama_lengkap', 'nama_pengguna'],
                      [/^nama/i, /full/i, /name/i]
                    ) || "User"}
                </Text>
                <Text style={styles.phone}>
                    {pickFrom(
                      profileData || userContext,
                      ['no_telepon', 'phone', 'phone_number', 'no_hp', 'no_telp', 'no_telpon', 'telepon', 'nomor_telepon', 'email'],
                      [/telepon/i, /telp/i, /telpon/i, /phone/i, /hp/i, /email/i]
                    ) || "-"}
                </Text>
              </View>
            </View>
          )}
          <TouchableOpacity onPress={() => router.push("/detailprofile")}>
            <Ionicons name="chevron-forward" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produk Favorit</Text>
          {favorites.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Belum ada produk favorit</Text>
            </View>
          ) : (
            favorites.map((item) => {
              const name = item.name || item.nama;
              const price = item.harga || item.price || 0;
              const image = item.image;
              return (
                <View key={item.id} style={styles.favoriteItem}>
                  <Image source={typeof image === "string" ? { uri: image } : image} style={styles.favoriteImage} />
                  <View style={styles.favoriteInfo}>
                    <Text style={styles.favoriteName} numberOfLines={2}>{name}</Text>
                    <Text style={styles.favoritePrice}>Rp {price.toLocaleString()}</Text>
                    <View style={styles.deliveryBadge}><Text style={styles.deliveryText}>Pengiriman Instan</Text></View>
                  </View>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => toggleFavorite(item)}>
                    <Ionicons name="trash-outline" size={20} color="#d32f2f" />
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>

        <View style={{ paddingHorizontal: 16, paddingBottom: 30 }}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#D32F2F" />
                <Text style={styles.logoutText}>Keluar Akun</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: { backgroundColor: "#2E7D32", padding: 20 },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 9 },
  account: { color: "#FFF", fontSize: 16, fontWeight: "700", marginTop: -15 },
  headerIcon: { marginTop: -10, position: "relative" },
  cartBadge: { position: "absolute", top: -5, right: -5, backgroundColor: "#FFA500", borderRadius: 10, minWidth: 20, height: 20, justifyContent: "center", alignItems: "center" },
  cartBadgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  userInfo: { flexDirection: "row", alignItems: "center" },
  userInfoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12, backgroundColor: "#FFF" },
  name: { color: "#FFF", fontSize: 15, fontWeight: "500" },
  phone: { color: "#E0E0E0", fontSize: 12 },
  scrollView: { flex: 1 },
  section: { backgroundColor: "#FFF", margin: 16, padding: 14, borderRadius: 12 },
  sectionTitle: { fontWeight: "600", fontSize: 14, marginBottom: 12 },
  emptyState: { paddingVertical: 40, alignItems: "center" },
  emptyText: { color: "#888", fontSize: 14 },
  favoriteItem: { flexDirection: "row", alignItems: "flex-start", backgroundColor: "#fff", paddingVertical: 12, paddingHorizontal: 10, marginTop: 10, borderRadius: 12, borderWidth: 1, borderColor: "#f0f0f0" },
  favoriteImage: { width: 70, height: 70, resizeMode: "cover", borderRadius: 8, backgroundColor: "#f5f5f5" },
  favoriteInfo: { flex: 1, marginLeft: 12, justifyContent: "flex-start" },
  favoriteName: { fontSize: 15, fontWeight: "600", color: "#333", marginBottom: 4 },
  favoritePrice: { fontSize: 14, fontWeight: "700", color: "#d32f2f", marginBottom: 6 },
  deliveryBadge: { alignSelf: "flex-start", backgroundColor: "#e8f5e9", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  deliveryText: { fontSize: 11, color: "#2E7D32", fontWeight: "600" },
  deleteButton: { padding: 8, justifyContent: "center", alignItems: "center" },
  logoutButton: { backgroundColor: "#FFEBEE", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 12, borderWidth: 1, borderColor: "#D32F2F", marginTop: 10 },
  logoutText: { color: "#D32F2F", fontWeight: "bold", fontSize: 16, marginLeft: 10 },
});