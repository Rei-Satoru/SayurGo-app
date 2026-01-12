import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles/detailulasanStyles';

export default function DetailUlasanScreen() {
  const router = useRouter();
  const { orderId, rating, review, date } = useLocalSearchParams();

  const score = Number(rating) || 0;
  const reviewText = review || 'Belum ada ulasan.';

  const ratingLabel =
    score >= 5
      ? 'Sangat Baik'
      : score >= 4
      ? 'Baik'
      : score >= 3
      ? 'Cukup'
      : score >= 1
      ? 'Kurang'
      : 'Belum dinilai';

  const formattedDate = date
    ? new Date(String(date)).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '-';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#F5F5F5', // 🔥 PENTING
        }}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              Lihat Penilaian & Ulasan
            </Text>
          </View>

          {/* Info */}
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoLabel}>No. Pesanan</Text>
              <Text style={styles.infoValue}>{orderId || '-'}</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>Dinilai & diulas pada</Text>
              <Text style={styles.infoValue}>{formattedDate}</Text>
            </View>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <View style={styles.avatarLarge}>
              <Ionicons name="person" size={40} color="#F59E0B" />
            </View>

            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons
                  key={i}
                  name={i <= score ? 'star' : 'star-outline'}
                  size={26}
                  color="#FFC107"
                />
              ))}
            </View>

            <Text style={styles.result}>{ratingLabel}</Text>
          </View>

          {/* Ulasan */}
          <Text style={styles.sectionTitle}>Ulasan</Text>
          <Text style={styles.ulasanText}>{reviewText}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
