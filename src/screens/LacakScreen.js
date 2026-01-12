import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/lacakStyles"; // Style tetap sama

import { useContext } from "react";
import { PesananContext } from "../context/PesananContext";

export default function LacakPesanan() {
  const { orderId } = useLocalSearchParams();
  const { orders } = useContext(PesananContext);

  // 1. Cari pesanan berdasarkan ID
  // Gunakan String() untuk memastikan perbandingan aman (kadang ID bisa number/string)
  const order = orders.find((o) => String(o.id) === String(orderId));

  // 2. Safety Check: Jika pesanan tidak ketemu (misal data belum load), tampilkan Loading/Kosong
  // Ini mencegah error "undefined is not an object"
  if (!order) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#333' }}>Memuat data pesanan...</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: '#F39C1E', fontWeight: 'bold' }}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. Tentukan Status Aktif
  // Logika: Jika status dari database adalah "Dibatalkan", kita anggap timeline-nya "Selesai" (berhenti)
  const currentStatus = order.status;
  const displayStatus = (currentStatus === "Selesai" || currentStatus === "Dibatalkan") 
    ? "Selesai" 
    : (currentStatus || "Pesanan Masuk");

  // Ambil tanggal dari order jika ada, kalau tidak pakai default hari ini
  const orderDate = order.tanggal || "Data Tanggal"; 
  const orderTime = order.jam || "00:00"; // Asumsi ada field jam, atau bisa dihapus

  // 4. Data Timeline
  // Di sini 'active' dicek berdasarkan displayStatus
  const timeline = [
    {
      id: 5,
      title: "Selesai",
      // Jika status ini aktif, tampilkan tanggal real, jika belum/lewat pakai strip atau tanggal estimasi
      time: displayStatus === "Selesai" ? `${orderDate} • ${orderTime}` : "-", 
      icon: require("../../assets/images/selesai.png"),
      active: displayStatus === "Selesai",
    },
    {
      id: 4,
      title: "Diterima",
      time: displayStatus === "Diterima" ? `${orderDate} • ${orderTime}` : "-",
      icon: require("../../assets/images/diterima.png"),
      active: displayStatus === "Diterima",
    },
    {
      id: 3,
      title: "Dalam Pengiriman",
      time: displayStatus === "Dalam Pengiriman" ? `${orderDate} • ${orderTime}` : "-",
      icon: require("../../assets/images/kirim.png"),
      active: displayStatus === "Dalam Pengiriman",
    },
    {
      id: 2,
      title: "Sedang Diproses",
      time: displayStatus === "Sedang Diproses" ? `${orderDate} • ${orderTime}` : "-",
      active: displayStatus === "Sedang Diproses",
      icon: require("../../assets/images/bungkus.png"),
    },
    {
      id: 1,
      title: "Pesanan Masuk",
      // Pesanan Masuk biasanya selalu punya tanggal awal
      time: `${orderDate} • ${orderTime}`, 
      icon: require("../../assets/images/masuk.png"),
      active: displayStatus === "Pesanan Masuk",
    },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lacak</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* INFO */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>No. Pengiriman</Text>
          <Text style={styles.value}>{orderId}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Jasa Pengiriman</Text>
          <Text style={styles.value}>KURIR INTERNAL</Text>
        </View>

        {/* TIMELINE */}
        <View style={styles.card}>
          <Text style={styles.section}>Riwayat Pengiriman</Text>

          {timeline.map((item, index) => (
            <View key={item.id} style={styles.timelineRow}>
              {/* ICON IMAGE */}
              <Image source={item.icon} style={styles.icon} />
              
              {/* LINE */}
              <View style={styles.lineContainer}>
                {/* Dot Active Logic: Style dotActive hanya muncul jika item.active true */}
                <View style={[styles.dot, item.active && styles.dotActive]} />
                {index !== timeline.length - 1 && <View style={styles.line} />}
              </View>

              {/* CONTENT */}
              <View style={styles.timelineContent}>
                <Text
                  style={[
                    styles.timelineTitle,
                    item.active && styles.activeText,
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.timelineTime}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryText}>Beli Lagi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}