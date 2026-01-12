import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { AuthContext } from '../context/AuthContext';
import { useAddToCart } from '../hooks/useAddToCart';
import { useOrders } from '../hooks/useOrders';
import styles from '../styles/detailpesananStyles';

export default function DetailPesanan() {
  const { orderId } = useLocalSearchParams();
  const [showProducts, setShowProducts] = useState(false); 
    const [profileData, setProfileData] = useState(null);
  
  const { orders, loading } = useOrders(); 
  const { addToCart } = useAddToCart();
  
  // Ambil Data User Login
  const { user } = useContext(AuthContext); 

    // Ambil profil user dari DB/storage untuk fallback (kalau order tidak menyimpan nama/alamat)
    useEffect(() => {
        const loadProfileFallback = async () => {
            try {
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

                const hasProfileFields = (obj) => {
                    const nama = pickFrom(obj, ['nama', 'name', 'full_name', 'nama_lengkap'], [/^nama/i, /full/i, /name/i]);
                    const telp = pickFrom(obj, ['no_telepon', 'phone', 'phone_number', 'no_hp', 'no_telp'], [/telepon/i, /telp/i, /telpon/i, /phone/i, /hp/i]);
                    const alamat = pickFrom(obj, ['alamat', 'address', 'alamat_rumah', 'alamat_pengiriman'], [/alamat/i, /address/i]);
                    return Boolean(pick(nama) && pick(telp) && pick(alamat));
                };

                // Gabung beberapa sumber local (hasil DB saat login)
                let merged = { ...(user || {}) };

                const storedSession = await AsyncStorage.getItem('user_session');
                if (storedSession) {
                    try {
                        merged = { ...merged, ...JSON.parse(storedSession) };
                    } catch {}
                }

                const rawUserData = await AsyncStorage.getItem('userData');
                if (rawUserData) {
                    try {
                        merged = { ...merged, ...JSON.parse(rawUserData) };
                    } catch {}
                }

                // Jika punya token, coba refresh dari DB (kalau endpoint mengirim field tambahan)
                let token = pick(merged?.token);
                if (!token) token = await AsyncStorage.getItem('userToken');

                if (token) {
                    const BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:FQ41T6Ks';
                    const headers = { Authorization: `Bearer ${token}` };

                    const tryGet = async (url) => {
                        try {
                            const res = await axios.get(url, { headers });
                            return res?.data;
                        } catch {
                            return null;
                        }
                    };

                    // 1) Coba auth/me dulu
                    const meData = await tryGet(`${BASE_URL}/auth/me`);
                    merged = { ...merged, ...(meData || {}) };

                    // 2) Kalau belum lengkap, coba endpoint user lain yang umum di Xano
                    if (!hasProfileFields(merged)) {
                        const userId = pick(merged?.id, merged?.user_id, meData?.id);
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
                }

                setProfileData(merged);
            } catch {
                // ignore
            }
        };

        loadProfileFallback();
    }, [user]);

  const order = useMemo(() => {
    if (!orders || orders.length === 0) return null;
    return orders.find(o => String(o.id) === String(orderId));
  }, [orders, orderId]);

  const { listItems, subtotal } = useMemo(() => {
    if (!order) return { listItems: [], subtotal: 0 };

    const items = order.transaksi_items_of_transaksi || 
                  order._transaksi_items_of_transaksii || 
                  order._transaksi_items || 
                  order.transaksi_items || 
                  order.items || 
                  [];

    const total = items.reduce((sum, item) => {
        const p = item._produk || item.produk_data || item;
        const price = Number(item.harga_saat_ini || p.harga || item.harga || 0);
        const qty = Number(item.qty || item.quantity || 1);
        return sum + (price * qty);
    }, 0);

    return { listItems: items, subtotal: total };
  }, [order]);

  const voucherValue = 0; 
  const ongkir = Number(order?.ongkir || 5000);

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

    // Data penerima & alamat: ambil dari order (DB), fallback ke profileData/user (DB)
    const userFromOrder =
        order?.user ||
        order?._user ||
        order?.users ||
        order?._users ||
        order?.user_data ||
        null;

    const namaUser =
        pickFrom(userFromOrder, ['nama', 'name', 'full_name', 'nama_lengkap'], [/^nama/i, /full/i, /name/i]) ||
        pickFrom(order, ['user_name', 'nama', 'name'], [/user.*name/i, /^nama/i, /name/i]) ||
        pickFrom(profileData, ['nama', 'name', 'full_name', 'nama_lengkap'], [/^nama/i, /full/i, /name/i]) ||
        pickFrom(user, ['nama', 'name', 'full_name', 'nama_lengkap'], [/^nama/i, /full/i, /name/i]) ||
        "-";

    const telpUser =
        pickFrom(userFromOrder, ['no_telepon', 'phone', 'phone_number', 'no_hp', 'no_telp'], [/telepon/i, /telp/i, /telpon/i, /phone/i, /hp/i]) ||
        pickFrom(order, ['user_phone', 'no_telepon', 'phone'], [/user.*phone/i, /telepon/i, /phone/i]) ||
        pickFrom(profileData, ['no_telepon', 'phone', 'phone_number', 'no_hp', 'no_telp'], [/telepon/i, /telp/i, /telpon/i, /phone/i, /hp/i]) ||
        pickFrom(user, ['no_telepon', 'phone', 'phone_number', 'no_hp', 'no_telp'], [/telepon/i, /telp/i, /telpon/i, /phone/i, /hp/i]) ||
        "-";

    const alamatLabel =
        pickFrom(order, ['alamat_nama', 'alamat_label', 'address_name', 'nama_alamat', 'label_alamat'], [/alamat.*(nama|label)/i, /address.*name/i]) ||
        "Alamat Pengiriman";

    const alamatPengiriman =
        pickFrom(
            order,
            [
                'alamat_pengiriman',
                'alamat',
                'address',
                'shipping_address',
                'delivery_address',
                'alamat_rumah',
                'user_address',
                'alamat_detail',
            ],
            [/alamat/i, /address/i, /shipping/i, /delivery/i]
        ) ||
        pickFrom(userFromOrder, ['alamat', 'address', 'alamat_rumah', 'alamat_pengiriman'], [/alamat/i, /address/i]) ||
        pickFrom(profileData, ['alamat', 'address', 'alamat_rumah', 'alamat_pengiriman'], [/alamat/i, /address/i]) ||
        pickFrom(user, ['alamat', 'address', 'alamat_rumah', 'alamat_pengiriman'], [/alamat/i, /address/i]) ||
        "-";

  if (loading && !order) {
      return (
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator size="large" color="#2E7D32"/>
          </View>
      )
  }

  if (!order) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detail Pesanan</Text>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#666'}}>Pesanan tidak ditemukan.</Text>
            </View>
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Pesanan</Text>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>

        {/* INFO HEADER */}
        <View style={styles.card}>
            <View style={styles.row}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png" }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.date}>{formatDate(order.created_at)}</Text>
                {/* Menampilkan Nama */}
                <Text style={styles.store}>{namaUser}</Text>
              </View>
            </View>
            
            <View style={localStyles.divider} />
            
            <View style={localStyles.rowBetween}>
                <Text style={localStyles.label}>No. Pesanan</Text>
                {/* Mengambil 8 Karakter UUID */}
                <Text style={localStyles.valueBold}>{`ORD-#${String(order.id).substring(0, 8).toUpperCase()}`}</Text>
            </View>
            <View style={localStyles.rowBetween}>
                <Text style={localStyles.label}>Jumlah Pengiriman</Text>
                <Text style={localStyles.value}>1 Pengiriman</Text>
            </View>
        </View>

        {/* ALAMAT */}
        <View style={styles.card}>
            <View style={{marginBottom: 12}}>
                <Text style={localStyles.label}>Alamat Toko</Text>
                <Text style={localStyles.valueBold}>2J78 - CISAAT SUKABUMI</Text>
            </View>
            <View style={localStyles.divider} />
            <View style={{marginTop: 12}}>
                <Text style={localStyles.label}>Alamat Pengiriman</Text>
                <Text style={localStyles.valueBold}>{alamatLabel}</Text>
                <Text style={localStyles.value}>{alamatPengiriman}</Text>
            </View>
        </View>

        {/* INFO PENGIRIMAN & PRODUK */}
        <View style={styles.card}>
            <View style={localStyles.rowBetween}>
                <View style={{flexDirection:'row', alignItems:'center', gap: 6}}>
                    <Ionicons name="time-outline" size={18} color="#2E7D32"/>
                    <Text style={{fontWeight:'bold', color:'#333'}}>Pengiriman Instan</Text>
                </View>
                <View style={localStyles.badgeYellow}>
                    <Text style={localStyles.badgeText}>{order.status || "Sedang Diproses"}</Text>
                </View>
            </View>

            <View style={{marginVertical: 12}}>
                <Text style={localStyles.label}>Penerima Paket</Text>
                <Text style={localStyles.valueBold}>{namaUser}</Text>
                <Text style={localStyles.value}>{telpUser}</Text>
            </View>

            <View style={localStyles.divider} />

            <View style={[localStyles.rowBetween, {paddingVertical: 12}]}>
                <View>
                    <Text style={localStyles.label}>No. Pengiriman</Text>
                    {/* Menggunakan fungsi generateShortTrackingID */}
                    <Text style={localStyles.valueBold}>{generateShortTrackingID(order.id)}</Text>
                </View>
                <TouchableOpacity onPress={() => router.push({ pathname: "/lacak", params: { orderId: order.id } })}>
                    <Text style={localStyles.linkOrange}>Lacak {'>'}</Text>
                </TouchableOpacity>
            </View>
            {/* ... Sisa kode sama ... */}
            
            <View style={localStyles.divider} />

            <View style={[localStyles.rowBetween, {paddingVertical: 12}]}>
                 <View>
                    <Text style={localStyles.label}>Pengiriman Maksimal</Text>
                    <Text style={localStyles.value}>{formatMaxDeliveryDate(order.created_at)}</Text>
                    <Text style={localStyles.value}>{getEstimasiWaktu(order.created_at)}</Text>
                </View>
                
                <TouchableOpacity onPress={() => setShowProducts(!showProducts)}>
                    <Text style={localStyles.linkOrange}>{listItems.length} Produk {'>'}</Text>
                </TouchableOpacity>
            </View>

            {showProducts && (
                <View style={{ marginTop: 10, backgroundColor:'#f9f9f9', padding:10, borderRadius:8 }}>
                    {listItems.map((item, index) => {
                        const p = item._produk || item.produk_data || item;
                        let imgUri = "https://placehold.co/100x100/png?text=IMG";
                        const rawImg = p.foto_produk || p.image || p.gambar || item.image || item.foto_produk;
                        
                        if(rawImg) {
                            if(typeof rawImg === 'string') imgUri = rawImg;
                            else if(rawImg.url) imgUri = rawImg.url;
                            else if(rawImg.uri) imgUri = rawImg.uri;
                        }

                        const namaProduk = p.nama_produk || p.nama || item.nama_produk || "Produk";
                        const price = Number(item.harga_saat_ini || p.harga || item.harga || 0);

                        return (
                            <View key={index} style={{ flexDirection: 'row', marginBottom: 12, alignItems: 'center' }}>
                                <Image source={{ uri: imgUri }} style={styles.productImage} resizeMode="cover"/>
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={styles.product}>{namaProduk}</Text>
                                    <Text style={styles.qty}>{item.qty} x Rp {price.toLocaleString('id-ID')}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
            )}
        </View>

        <View style={{ paddingHorizontal: 14, marginTop: 10 }}>
            <TouchableOpacity 
                style={localStyles.outlineButton}
                onPress={() => router.push({ 
                    pathname: '/ulasan', 
                    params: { orderId: order?.id } 
                })}
            >
                <Text style={localStyles.outlineText}>Lihat Ulasan</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>

      <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.buttomBar}
            onPress={() => {
              if(listItems.length > 0) {
                  listItems.forEach((it) => {
                    const p = it._produk || it.produk_data || it; 
                    const realId = p.id || it.product_id; 
                    addToCart({
                      id: String(realId), 
                      nama: p.nama_produk || p.nama || "Produk",
                      harga: Number(p.harga || it.harga_satuan || 0),
                      image: p.foto_produk || p.image || it.foto_produk,
                      berat: p.berat || "1kg",
                      jenis: p.kategori || "Umum",
                    });
                  });
                  router.push('/cart');
              } else {
                  alert("Tidak ada item untuk dibeli lagi.");
              }
            }}
          >
            <Text style={styles.primaryText}>Beli Lagi</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

// === LOCAL STYLES ===
const localStyles = StyleSheet.create({
    statusBanner: {
        backgroundColor: '#FFF59D',
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    statusBannerText: {
        color: '#F57F17',
        fontWeight: 'bold',
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 10,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        color: '#888',
        marginBottom: 2,
    },
    value: {
        fontSize: 14,
        color: '#333',
    },
    valueBold: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    badgeYellow: {
        backgroundColor: '#FFF59D',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#F9A825',
    },
    linkOrange: {
        color: '#F97316',
        fontWeight: 'bold',
        fontSize: 14,
    },
    outlineButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#F97316',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    outlineText: {
        color: '#F97316',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

// === HELPER FUNCTIONS ===
const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp); 
    return date.toLocaleDateString("id-ID", {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    }) + " WIB";
};

const formatMaxDeliveryDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
        weekday: 'long', 
        day: 'numeric',  
        month: 'long',   
        year: 'numeric'  
    });
};

const getEstimasiWaktu = (timestamp) => {
    if (!timestamp) return "-";
    const start = new Date(timestamp);
    const end = new Date(start.getTime() + 30 * 60 * 1000); 
    const fmt = (d) => {
        const h = d.getHours().toString().padStart(2, '0');
        const m = d.getMinutes().toString().padStart(2, '0');
        return `${h}.${m}`;
    };
    return `${fmt(start)} - ${fmt(end)} WIB`;
};

// 👇 Fungsi Generator Nomor Resi (Tracking ID)
const generateShortTrackingID = (id) => {
    if (!id) return "JP-DATA";
    
    // Jika ID Angka (1, 2, 3) -> Pakai logika tambah
    if (!isNaN(id)) {
        return `JP-${Number(id) + 8000}`;
    }

    // Jika ID UUID (String) -> Ambil 6 Karakter Depan
    // Kalau mau disamakan 8 huruf, ganti angka 6 jadi 8
    return `JP-${String(id).substring(0, 6).toUpperCase()}`;
};