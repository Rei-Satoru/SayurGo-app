import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

// Import Hook
import { AuthContext } from "../context/AuthContext";
import { PromoContext } from "../context/PromoContext";
import { useCheckout } from "../hooks/useCheckout";
import styles from "../styles/checkoutStyles";

export default function CheckOutScreen() {
  const router = useRouter();
  const { items } = useLocalSearchParams();

  const { user } = useContext(AuthContext);
  const [checkoutUser, setCheckoutUser] = useState(null);
  
  // Panggil Hook Checkout
  const { processCheckout, loading } = useCheckout();
  const [showModal, setShowModal] = useState(false);

  // Parsing Items dari params
  let selectedItems = [];
  try {
    selectedItems = items ? JSON.parse(items) : [];
  } catch (e) {
    selectedItems = [];
  }
  
  const { selectedVoucher, selectedOngkir, useCoin, coinBalance } = useContext(PromoContext);

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

  useEffect(() => {
    const loadCheckoutUser = async () => {
      try {
        let merged = { ...(user || {}) };

        const rawUserData = await AsyncStorage.getItem('userData');
        if (rawUserData) {
          try {
            merged = { ...merged, ...JSON.parse(rawUserData) };
          } catch {}
        }

        const storedSession = await AsyncStorage.getItem('user_session');
        if (storedSession) {
          try {
            merged = { ...merged, ...JSON.parse(storedSession) };
          } catch {}
        }

        setCheckoutUser(merged);
      } catch {
        setCheckoutUser(user || null);
      }
    };

    loadCheckoutUser();
  }, [user]);

  // --- HITUNG-HITUNGAN ---
  const subtotal = Array.isArray(selectedItems)
    ? selectedItems.reduce(
        (sum, item) => sum + (Number(item.harga) || 0) * (item.qty || 1),
        0
      )
    : 0;

  // Voucher Logic
  let voucherValue = 0;
  if (selectedVoucher) {
    voucherValue = selectedVoucher.type === "nominal"
        ? selectedVoucher.value
        : Math.floor(subtotal * (selectedVoucher.value / 100));
  }

  // Ongkir Logic
  const DEFAULT_ONGKIR = 5000;
  const ongkir = typeof selectedOngkir?.harga === "number" ? selectedOngkir.harga : DEFAULT_ONGKIR;

  // Coin Logic
  const COIN_VALUE_RP = 10;
  const maxRedeemRp = (coinBalance || 0) * COIN_VALUE_RP;
  const coin = useCoin ? Math.min(maxRedeemRp, subtotal + ongkir - voucherValue) : 0;

  // Total Akhir
  const totalBelanja = Math.max(subtotal + ongkir - voucherValue - coin, 0);
  const MIN_ORDER = 0;
  const canCheckout = subtotal >= MIN_ORDER;

  // 👇 FUNGSI KIRIM DATA
  const handleOrder = async () => {
    if (!canCheckout) return;

    // 🔍 1. MAPPING DATA PRODUK
    const itemsToSend = selectedItems.map(item => {
        // 🛑 PERBAIKAN LOGIKA ID DI SINI 🛑
        // Prioritaskan 'product_id' (dari keranjang) dulu, baru 'id' (dari beli langsung)
        const realId = item.product_id || item.id || (item._produk && item._produk.id);
        
        return {
            // Pastikan dikirim sebagai String jika backend Xano menggunakan UUID/Text
            id: String(realId),          
            product_id: String(realId),  
            
            qty: Number(item.qty),
            
            harga: Number(item.harga || 0),
            harga_saat_ini: Number(item.harga || 0)
        };
    });

    // 🔍 2. CEK VALIDASI
    const checkInvalid = itemsToSend.find(i => !i.product_id || i.product_id === "undefined" || i.product_id === "null");
    
    if (checkInvalid) {
        alert(`Gagal: Data produk tidak valid.\nID terdeteksi: ${JSON.stringify(checkInvalid)}`);
        return;
    }

    // 3. SIAPKAN PAYLOAD UTAMA
    const userId = checkoutUser?.id || user?.id || 1;
    const payload = {
      user_id: userId,
        total_harga: totalBelanja,
        subtotal: subtotal,
        ongkir: ongkir,
        status: "Sedang Diproses",
        items: itemsToSend 
    };

    // 4. KIRIM KE API
    const success = await processCheckout(payload);

    // 5. JIKA SUKSES
    if (success) {
        setShowModal(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pesan dan Bayar</Text>
        </View>
      </View>

      {/* Success Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={localStyles.overlay}>
          <View style={localStyles.modalCard}>
            <Ionicons name="checkmark-circle" size={92} color="#22C55E" />
            <Text style={localStyles.modalTitle}>Pesanan Berhasil</Text>
            <Text style={localStyles.modalSubtitle}>
              Terima Kasih telah membuat pesanan, silahkan cek kembali di riwayat pemesanan
            </Text>

            <TouchableOpacity
              style={localStyles.modalButton}
              onPress={() => {
                setShowModal(false);
                router.replace('/(tabs)'); 
              }}
            >
              <Text style={localStyles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Alamat */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alamat Pengiriman</Text>
          <View style={styles.addressBox}>
            <View style={styles.addressHeader}>
              <Ionicons name="home" size={20} color="#2E7D32" />
              <Text style={styles.addressName}>
                {pickFrom(
                  checkoutUser,
                  ['alamat_nama', 'alamat_label', 'address_name', 'nama_alamat', 'label_alamat'],
                  [/alamat.*(nama|label)/i, /address.*name/i]
                ) || "Alamat"}
              </Text>
            </View>
            <Text style={styles.addressText}>
              {pickFrom(
                checkoutUser,
                ['alamat', 'address', 'alamat_rumah', 'alamat_pengiriman', 'shipping_address', 'delivery_address'],
                [/alamat/i, /address/i, /shipping/i, /delivery/i]
              ) || "-"}
            </Text>
          </View>
        </View>

        {/* List Pesanan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pesanan</Text>
          {selectedItems.map((item) => {
            
            // Logic Gambar
            let imgSource = { uri: "https://placehold.co/100x100/png?text=No+Image" };
            const p = item._produk || item.produk_data || item;
            // Ambil gambar dari berbagai kemungkinan properti
            const rawImg = p.foto_produk || p.image || p.gambar || item.image;

            if (rawImg) {
                if (typeof rawImg === 'string') {
                    imgSource = { uri: rawImg };
                } else if (rawImg.url) {
                    imgSource = { uri: rawImg.url };
                } else if (rawImg.uri) {
                    imgSource = rawImg;
                }
            }

            const namaProduk = p.nama_produk || p.nama || item.nama || "Produk";
            const hargaProduk = Number(p.harga || item.harga || 0);

            return (
                <View key={item.id} style={styles.orderItem}>
                    <Image source={imgSource} style={styles.orderItemImage} resizeMode="cover" />
                    
                    <View style={styles.orderItemInfo}>
                        <Text style={styles.itemName} numberOfLines={2}>
                            {namaProduk}
                        </Text>
                        <Text style={styles.itemDetails}>
                            {item.qty}x {item.berat || "items"}
                        </Text>
                    </View>
                    
                    <Text style={styles.itemPrice}>
                        Rp {(hargaProduk * item.qty).toLocaleString('id-ID')}
                    </Text>
                </View>
            );
          })}
        </View>

        {/* Ringkasan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>Rp {subtotal.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Voucher</Text>
              <Text style={styles.summaryValue}>- Rp {voucherValue.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Koin</Text>
              <Text style={styles.summaryValue}>- Rp {coin.toLocaleString()}</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryBorder]}>
              <Text style={styles.summaryLabel}>Total Kirim</Text>
              <Text style={styles.summaryValue}>Rp {ongkir.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabelBold}>Total Belanja</Text>
              <Text style={styles.summaryValueBold}>Rp {totalBelanja.toLocaleString()}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Button Sticky */}
      <View style={styles.stickyButton}>
        <TouchableOpacity
            disabled={!canCheckout || loading}
            style={[styles.pesanBtn, (!canCheckout || loading) && { opacity: 0.5 }]}
            onPress={handleOrder}
        >
            {loading ? (
                <ActivityIndicator color="#fff" size="small" />
            ) : (
                <Text style={styles.pesanText}>Pesan</Text>
            )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', padding: 18,
  },
  modalCard: {
    width: '100%', maxWidth: 520, backgroundColor: '#fff', borderRadius: 8, paddingVertical: 28, paddingHorizontal: 22, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 18, elevation: 10,
  },
  modalTitle: { fontSize: 20, fontWeight: '700', marginTop: 12, marginBottom: 6 },
  modalSubtitle: { textAlign: 'center', color: '#6B7280', marginBottom: 20 },
  modalButton: { marginTop: 6, backgroundColor: '#6EC1E4', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 8 },
  modalButtonText: { color: '#fff', fontWeight: '700' },
});