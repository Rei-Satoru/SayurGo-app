import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function WelcomeOnboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topGreen}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/images/pedagang.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}><Text style={styles.titleMain}>Sayur.</Text><Text style={styles.titleAccent}>Go</Text></Text>
        <Text style={styles.subtitle}>Temukan bahan pangan segar hanya disini.
Segarnya sampai rumah anda</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/login') }>
          <Text style={styles.buttonText}>Ayo Belanja</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  topGreen: {
    height: '55%',
    backgroundColor: '#2E7D32',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageWrapper: {
    width: width,
    alignItems: 'center',
    marginBottom: -40,
  },
  heroImage: {
    width: 260,
    height: 260,
    borderRadius: 8,
    backgroundColor: 'transparent'
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 54,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 12,
  },
  titleMain: {
    color: '#2E7D32'
  },
  titleAccent: {
    color: '#FFA500'
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 22,
    lineHeight: 20
  },
  button: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  }
});