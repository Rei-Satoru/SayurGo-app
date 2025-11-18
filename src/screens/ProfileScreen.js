import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/user.png')}
        style={styles.avatar}
      />
      <Text style={styles.name}>Anisa FM</Text>
      <Text style={styles.email}>anisa@example.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA' },
  avatar: { width: 80, height: 80, marginBottom: 15, tintColor: '#2E7D32' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#2E7D32' },
  email: { fontSize: 14, color: '#555' },
});
