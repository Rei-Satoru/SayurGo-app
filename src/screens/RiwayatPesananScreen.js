import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl
} from "react-native";

// Import Hook dari Code 2
import { useAddToCart } from "../hooks/useAddToCart";
import { useOrders } from "../hooks/useOrders";

export default function RiwayatPesananScreen() {
  const router = useRouter();
  // 👇 LOGIKA UTAMA DARI CODE 2
  const { addToCart } = useAddToCart();
  const { orders, loading, refetch } = useOrders();

  // Helper Format Tanggal (Code 2)
  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp); 
    return date.toLocaleDateString("id-ID", {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    }) + " WIB";
  };

  // Helper Warna Status (Campuran: Logic String Code 2 + Warna Code 1)
  const getColorForStatus = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("selesai")) return "#22C55E"; // Hijau Code 1
    if (s.includes("batal")) return "#F7D274";   // Kuning/Orange Code 1
    return "#FACC15"; // Kuning Default Code 1
  };

  return (
    // 👇 TAMPILAN CONTAINER (CODE 1)
    <View style={styles.container}>
      {/* HEADER (CODE 1) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Riwayat Pesanan</Text>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: 12 }}
        refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} colors={['#2E7D32']} />
        }
      >
        {loading && orders.length === 0 ? (
             <ActivityIndicator size="large" color="#2E7D32" style={{ marginTop: 50 }} />
        ) : orders.length > 0 ? (
          orders.map((order) => {
            
            // 👇 LOGIKA DATA MAPPING (CODE 2 - XANO)
            const listItems = order._transaksi_items_of_transaksii || 
                              order.transaksi_items || 
                              order.items || 
                              [];

            const firstItem = listItems.length > 0 ? listItems[0] : null;
            
            const productDetail = firstItem 
                ? (firstItem._produk || firstItem.produk || firstItem.produk_data || {}) 
                : {};

            let imgUri = "https://placehold.co/100x100/png?text=IMG";
            const rawImg = productDetail.foto_produk || productDetail.image || productDetail.gambar;
            
            if (rawImg) {
                if (typeof rawImg === 'string') imgUri = rawImg;
                else if (rawImg.url) imgUri = rawImg.url;
            }

            const namaProduk = productDetail.nama_produk || productDetail.nama || "Produk Tanpa Nama";
            // 👆 SELESAI LOGIKA DATA

            return (
                // 👇 TAMPILAN CARD (CODE 1)
                <TouchableOpacity
                    key={order.id}
                    style={styles.card}
                    activeOpacity={0.9}
                    onPress={() => router.push({ pathname: "/detailpesanan", params: { orderId: order.id } })}
                >
                    {/* CARD HEADER (CODE 1) */}
                    <View style={styles.cardHeader}>
                        <View style={styles.scooterIconContainer}>
                            <Ionicons name="bicycle-outline" size={20} color="#2E7D32" />
                        </View>
                        <View style={styles.headerTextContainer}>
                            {/* Pakai data formatDate Code 2 */}
                            <Text style={styles.tanggal}>{formatDate(order.created_at)}</Text>
                            <Text style={styles.kirimText}>
                                Dikirim Ke Alamat - {listItems.length} Barang
                            </Text>
                        </View>
                    </View>

                    {/* CARD BODY (CODE 1) */}
                    <View style={styles.cardBody}>
                        <Image 
                            source={{ uri: imgUri }} 
                            style={styles.image} 
                            resizeMode="cover"
                        />

                        <View style={styles.info}>
                            <View style={[styles.status, { backgroundColor: getColorForStatus(order.status) }]}>
                                <Text style={styles.statusText}>{order.status || "Diproses"}</Text>
                            </View>

                            <Text style={styles.contactText}>
                                {order.user_phone || "Info kontak tidak tersedia"}
                            </Text>

                            <Text numberOfLines={2} style={styles.namaProduk}>
                                {namaProduk}
                            </Text>

                            <Text style={styles.jumlah}>
                                {listItems.length} Produk {listItems.length > 1 ? "Lainnya" : ""}
                            </Text>
                        </View>
                    </View>

                    {/* BUTTONS (TAMPILAN CODE 1, LOGIKA CODE 2) */}
                    <View style={styles.buttonWrapper}>
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            {order.status === "Selesai" || order.status === "Dibatalkan" ? (
                                // TOMBOL BELI LAGI
                                <TouchableOpacity
                                    style={styles.button} // Style Code 1 (Orange)
                                    onPress={() => {
                                        // Logic Code 2 (AddToCart Loop)
                                        if(listItems.length > 0) {
                                            listItems.forEach((it) => {
                                                const p = it._produk || it.produk || {};
                                                addToCart({
                                                    id: p.id || it.product_id,
                                                    nama: p.nama_produk || "Produk",
                                                    harga: Number(p.harga || 0),
                                                    image: p.foto_produk,
                                                    berat: p.berat || "1kg",
                                                    jenis: p.kategori || "Umum",
                                                });
                                            });
                                            router.push("/cart");
                                        } else {
                                            alert("Data tidak lengkap untuk beli lagi.");
                                        }
                                    }}
                                >
                                    <Text style={styles.buttonText}>Beli Lagi</Text>
                                </TouchableOpacity>
                            ) : (
                                <>
                                    {/* TOMBOL LIHAT */}
                                    <TouchableOpacity
                                        style={styles.button} // Style Code 1 (Orange)
                                        onPress={() => router.push({ pathname: "/detailpesanan", params: { orderId: order.id } })}
                                    >
                                        <Text style={styles.buttonText}>Lihat</Text>
                                    </TouchableOpacity>

                                    {/* TOMBOL LACAK */}
                                    {order.status !== "Sedang Diproses" && (
                                        <TouchableOpacity
                                            style={styles.trackButton} // Style Code 1 (Gray)
                                            onPress={() => router.push({ pathname: "/lacak", params: { orderId: order.id } })}
                                        >
                                            <Text style={styles.trackButtonText}>Lacak</Text>
                                        </TouchableOpacity>
                                    )}
                                </>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            );
          })
        ) : (
          <View style={{alignItems:'center', marginTop: 50}}>
              <Text style={styles.emptyText}>Belum ada riwayat pesanan.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// 👇 STYLES DARI CODE 1 (PERSIS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  header: {
    backgroundColor: "#2E7D32",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  scooterIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  headerTextContainer: {
    flex: 1,
  },

  tanggal: {
    fontSize: 12,
    color: "#333",
    marginBottom: 2,
  },

  kirimText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "400",
  },

  cardBody: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#f5f5f5",
  },

  info: {
    flex: 1,
  },

  status: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 6,
  },

  statusText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "600",
  },

  contactText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },

  namaProduk: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },

  jumlah: {
    fontSize: 12,
    color: "#666",
  },

  buttonWrapper: {
    alignItems: "flex-end",
    marginTop: 4,
  },

  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#F97316",
  },

  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  trackButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
  },

  trackButtonText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#6B7280",
  },
});