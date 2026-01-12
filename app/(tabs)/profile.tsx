import React from 'react';
<<<<<<< HEAD
import ProfileScreen from '../../src/screens/ProfileScreen';

export default function Index() {
  return <ProfileScreen />;
}
=======
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Anisa FM</Text>
      <Text style={styles.email}>anisa@example.com</Text>

      <View style={styles.card}>
        <Text style={styles.infoTitle}>Alamat</Text>
        <Text style={styles.infoText}>Jl. Puspa Mekar No. 21, Sukabumi</Text>

        <Text style={styles.infoTitle}>Status Akun</Text>
        <Text style={styles.infoText}>Pembeli Aktif</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#FAFAFA', paddingTop: 60 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#2E7D32' },
  email: { color: '#666', marginBottom: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    width: '85%',
    elevation: 3,
  },
  infoTitle: { fontWeight: 'bold', color: '#2E7D32', marginTop: 10 },
  infoText: { color: '#444' },
});
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
