import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Tambah AsyncStorage
import axios from 'axios'; // Tambah Axios
import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react'; // Tambah useState & useEffect
import { Text, TouchableOpacity, View } from 'react-native';

// Pastikan path styles ini sesuai dengan file kamu
import styles from '../styles/detailprofileStyles';

// 👇 Import AuthContext
import { AuthContext } from "../context/AuthContext";

export default function DetailProfileScreen() {
  // 1. AMBIL TOKEN DARI CONTEXT
  const { user } = useContext(AuthContext);

  // 2. STATE UNTUK DATA FRESH DARI DATABASE
  const [profileData, setProfileData] = useState(null);

  // 3. LOGIKA AMBIL DATA LANGSUNG (Supaya nama & no hp update)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const pick = (...values) => values.find((v) => v !== undefined && v !== null && String(v).trim() !== "");

        // Ambil data user terakhir dari storage (biasanya hasil dari DB saat login)
        let storedUserData = null;
        const rawUserData = await AsyncStorage.getItem('userData');
        if (rawUserData) {
          try {
            storedUserData = JSON.parse(rawUserData);
          } catch (e) {
            console.log('Gagal parse userData:', e);
          }
        }

        let token = pick(user?.token);

        // Jika token di context kosong, cari di storage (utama: user_session, fallback: userToken)
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
        
        const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:FQ41T6Ks";
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

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

        const tryGet = async (url) => {
          try {
            const res = await axios.get(url, { headers });
            return res?.data;
          } catch {
            return null;
          }
        };

        let merged = { ...(storedUserData || {}), ...(user || {}) };
        let meData = null;

        if (token) {
          meData = await tryGet(`${BASE_URL}/auth/me`);
          merged = { ...merged, ...(meData || {}) };
        }

        // Jika /auth/me tidak mengandung field lengkap, coba endpoint user umum di Xano
        if (token && !hasProfileFields(merged)) {
          const userId = pick(merged?.id, merged?.user_id, meData?.id, storedUserData?.id, user?.id);
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
        console.log("Gagal load detail profile:", error);
      }
    };

    fetchUserData();
  }, [user]);

  // Data yang ditampilkan: Prioritas dari Database (profileData), kalau belum ada pakai Context (user)
  const displayData = profileData || user;

  const pick = (...values) => values.find((v) => v !== undefined && v !== null && String(v).trim() !== "");

  const pickFrom = (obj, paths = [], keyRegexes = []) => {
    const getByPath = (o, path) => {
      if (!o || !path) return undefined;
      return path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), o);
    };

    const byPaths = pick(...paths.map((p) => getByPath(obj, p)));
    if (byPaths !== undefined) return byPaths;

    if (!obj || typeof obj !== 'object') return undefined;

    const tryEntries = (o) => {
      for (const [k, v] of Object.entries(o)) {
        if (keyRegexes.some((r) => r.test(k)) && pick(v) !== undefined) return v;
      }
      for (const [, v] of Object.entries(o)) {
        if (v && typeof v === 'object' && !Array.isArray(v)) {
          for (const [k2, v2] of Object.entries(v)) {
            if (keyRegexes.some((r) => r.test(k2)) && pick(v2) !== undefined) return v2;
          }
        }
      }
      return undefined;
    };

    return tryEntries(obj);
  };

  const renderRow = (label, value) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || "-"}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header & Avatar (Sama Persis) */}
      <View style={styles.header}>
         <TouchableOpacity onPress={() => router.back()}>
             <Ionicons name="arrow-back" size={22} color="#fff" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>Profile Saya</Text>
      </View>

      {/* Info Profil */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Info Profil</Text>
          <TouchableOpacity>
             <Text style={styles.editText}>Ubah</Text>
          </TouchableOpacity>
        </View>

        {/* 👇 DATA SUDAH SESUAI DENGAN DATABASE */}
        {renderRow(
          'Nama',
          pickFrom(
            displayData,
            ['nama', 'name', 'full_name', 'nama_lengkap', 'nama_pengguna'],
            [/^nama/i, /full/i, /name/i]
          )
        )}
        {renderRow(
          'Nomor Telepon',
          pickFrom(
            displayData,
            ['no_telepon', 'phone', 'phone_number', 'no_hp', 'no_telp', 'no_telpon', 'telepon', 'nomor_telepon'],
            [/telepon/i, /telp/i, /telpon/i, /phone/i, /hp/i]
          )
        )}
        {renderRow('Email', pickFrom(displayData, ['email'], [/email/i]))}
        {renderRow(
          'Alamat',
          pickFrom(
            displayData,
            ['alamat', 'address', 'alamat_rumah', 'alamat_pengiriman'],
            [/alamat/i, /address/i]
          )
        )}
      </View>
    </View>
  );
}