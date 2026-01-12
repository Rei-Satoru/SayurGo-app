import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useContext(AuthContext); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // 1. Validasi Input
    if (!email || !password) {
      Alert.alert("Peringatan", "Email dan Kata Sandi wajib diisi!");
      return;
    }

    setLoading(true);

    const AUTH_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:FQ41T6Ks/auth/login';

    try {
      console.log("Mencoba login ke:", AUTH_URL);

      // 2. Request ke API
      const response = await axios.post(AUTH_URL, {
        email: email,
        password: password
      }, { timeout: 10000 });

      const result = response.data;

      // 3. Login Sukses
      if (result.authToken) {
        console.log("Login Sukses!");
        
        const userData = result.user || {};

        // Simpan juga key legacy agar screen lain yang masih membaca userToken/userData tetap jalan
        try {
          await AsyncStorage.setItem('userToken', result.authToken);
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
        } catch (e) {
          console.error("Gagal simpan userToken/userData:", e);
        }

        // Simpan SELURUH object user dari DB agar field seperti telepon/alamat tidak hilang
        // Tambahkan token + alias foto agar tetap kompatibel dengan kode lain
        login({
          ...(userData || {}),
          token: result.authToken,
          foto: userData?.foto || userData?.foto_profil,
        });
        
        Alert.alert("Berhasil", `Selamat datang, ${userData.nama || userData.name || 'User'}!`);
        
        setTimeout(() => {
            router.replace('/(tabs)');
        }, 500);
      } 

    } catch (error) {
      console.error("Login Error:", error);
      
      // 👇 BAGIAN INI YANG DIUBAH SESUAI PERMINTAAN 👇
      if (error.response) {
          // Error 401/400 dari Xano (Salah password atau Email tidak ada)
          // Xano biasanya mengirim pesan: "Incorrect email or password" atau "Unable to locate user..."
          const pesanServer = error.response.data.message || "";

          if (
            pesanServer.includes("Incorrect") || 
            pesanServer.includes("not found") || 
            pesanServer.includes("locate")
          ) {
              // Pesan khusus permintaan Anda
              Alert.alert("Gagal Masuk", "Akun tidak terdaftar atau kata sandi salah.");
          } else {
              // Error lain dari server
              Alert.alert("Gagal", pesanServer);
          }
      } else if (error.code === 'ECONNABORTED') {
          Alert.alert("Timeout", "Koneksi lambat. Periksa internet Anda.");
      } else if (error.request) {
          Alert.alert("Koneksi Error", "Tidak dapat terhubung ke server.");
      } else {
          Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // --- TAMPILAN (TIDAK BERUBAH) ---
  return (
    <SafeAreaView style={styles.container}>
       <View style={{ flex: 1 }}>
        <View style={styles.header}>
            <Text style={styles.title}>Halo!</Text>
            <Text style={{color:'#eee', fontSize:16}}>Silakan masuk akun anda</Text>
        </View>
        
        <View style={styles.whiteCurve} />
        
        <View style={styles.card}>
            {/* Input Email */}
            <View style={styles.inputRow}>
                <Ionicons name="mail-outline" size={20} color="#F39C1E" />
                <TextInput 
                    placeholder="Email" 
                    style={styles.input} 
                    onChangeText={setEmail} 
                    value={email} 
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>

            {/* Input Password */}
            <View style={styles.inputRow}>
                <Ionicons name="lock-closed-outline" size={20} color="#F39C1E" />
                <TextInput 
                    placeholder="Kata Sandi" 
                    style={styles.input} 
                    secureTextEntry 
                    onChangeText={setPassword} 
                    value={password}
                />
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff"/> 
                ) : (
                    <Text style={styles.buttonText}>Masuk</Text>
                )}
            </TouchableOpacity>

            <View style={{marginTop:20, alignItems:'center'}}>
                <Text style={{color:'#999', fontSize: 12}}>Gunakan email & password yang terdaftar di Xano</Text>
            </View>
        </View>
       </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#388E3C' },
  header: { height: 300, paddingHorizontal: 28, paddingTop: 70, justifyContent: 'flex-start' },
  title: { fontSize: 36, fontWeight: '800', color: '#fff', marginBottom:5 },
  whiteCurve: { position: 'absolute', top: 260, width: '150%', height: 260, backgroundColor: '#fff', borderTopLeftRadius: 300, borderTopRightRadius: 300, alignSelf: 'center', zIndex: 0 },
  card: { flex: 1, backgroundColor: '#fff', marginTop: -80, borderTopLeftRadius: 200, borderTopRightRadius: 200, paddingHorizontal: 24, paddingTop: 40, zIndex: 99 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8DFC1', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 14, marginBottom: 14 },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
  button: { backgroundColor: '#FF9F1C', paddingVertical: 16, borderRadius: 18, alignItems: 'center', marginTop: 10, elevation: 5, shadowColor:'#000', shadowOpacity:0.1, shadowRadius:4 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});