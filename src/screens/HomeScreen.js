import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

import styles from "../../src/styles/homeStyles";
import ProductCard from "../component/ProductCard";
import { useProducts } from "../hooks/useProducts";

import AddToCartPopup from "../component/AddToCartPopup";
import { useAddToCart } from "../hooks/useAddToCart";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  
  // API Hook
  const { products, loading } = useProducts(); 

  // 👇 2. PANGGIL HOOK ADD TO CART
  const { addToCart, showPopup } = useAddToCart();
  
  // Redux Cart
  // PERBAIKAN 1: Tambahkan '|| []' (array kosong) agar tidak error jika items undefined
  // Gunakan 'state.cart?.items' (tanda tanya) untuk jaga-jaga jika state.cart belum ada
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.length;

  const categories = [
    { id: 1, name: "Sayuran", icon: require("../../assets/images/vegetables.png") },
    { id: 2, name: "Buah", icon: require("../../assets/images/Buah.png") },
    { id: 3, name: "Bumbu", icon: require("../../assets/images/Bumbu.png") },
    { id: 4, name: "Lauk", icon: require("../../assets/images/IKAN.png") },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* ===== Top Search Bar ===== */}
      <View style={styles.topSearchBar}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari produk disini..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push("/cart")}
          style={styles.headerIcon}
        >
          <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
          {/* Badge Cart dari Redux */}
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* ===== Hero Image ===== */}
        <View style={styles.heroSection}>
          <Image
            source={require("../../assets/images/pedagang.png")}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* ===== Category Section ===== */}
        <View style={[styles.section, { paddingHorizontal: 0 }]}>
          <Text style={styles.sectionHeader}>
            Cari Berdasarkan <Text style={styles.boldGreen}>Kategori</Text>
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 12 }}
          >
            {categories.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.categoryBoxSquare}
                onPress={() => {
                  const key = item.name.toLowerCase();
                  if (key === "sayuran") router.push("/sayur");
                  else if (key === "buah") router.push("/buah");
                  else if (key === "bumbu") router.push("/bumbu");
                  else if (key === "lauk") router.push("/lauk");
                }}
              >
                <Image
                  source={typeof item.icon === "string" ? { uri: item.icon } : item.icon}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryLabel}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ===== Product Section ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Produk <Text style={styles.boldGreen}>Populer</Text>
          </Text>

          {loading ? (
             <ActivityIndicator size="large" color="#2E7D32" style={{ marginTop: 20, marginBottom: 20 }} />
          ) : products && products.length > 0 ? (
             <ScrollView 
               horizontal 
               showsHorizontalScrollIndicator={false} 
               scrollEventThrottle={16}
               contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 8 }}
             >
              {(products || [])
                .filter((p) => {
                    const productName = p.nama || p.name || p.nama_produk || "";
                    const matchesSearch = search === "" || productName.toLowerCase().includes(search.toLowerCase());
                    const isPopular = (p.rating || 0) >= 4; 
                    return matchesSearch && isPopular;
                })
                .slice(0, 10)
                .map((item) => {
                  const normalized = {
                    id: item.id,
                    nama: item.nama_produk || "Tanpa Nama",
                    name: item.nama_produk || "Tanpa Nama",
                    harga: item.harga || 0,
                    price: item.harga || 0,
                    image: item.foto_produk?.url ? { uri: item.foto_produk.url } : (item.foto_produk ? { uri: item.foto_produk } : require("../../assets/images/vegetables.png")),
                    foto_produk: item.foto_produk,
                    berat: item.berat ? `${item.berat} ${item.satuan || 'kg'}` : '1 kg',
                    weight: item.berat ? `${item.berat} ${item.satuan || 'kg'}` : '1 kg',
                    jenis: item.kategori || item.jenis || 'Umum',
                    category: item.kategori || item.jenis || 'Umum',
                    rating: item.rating || 0,
                    deskripsi: item.deskripsi || item.deskripsi_produk || ""
                  };
                  return (
                    <ProductCard 
                        key={`prod-${item.id}`} 
                        item={normalized} 
                        compact={true}
                        onAddToCart={() => addToCart(normalized)}
                    />
                  );
                })}
             </ScrollView>
          ) : (
             <View style={{ paddingVertical: 20, alignItems: 'center' }}>
               <Text style={{ color: '#999', fontSize: 14 }}>Tidak ada produk yang cocok</Text>
             </View>
          )}
        </View>

        {/* Promo Section */}
        <View style={styles.section}>
          <View style={styles.promoRow}>
            <View style={styles.promoBanner}>
              <View style={styles.promoLeftContent}>
                <View style={styles.promoTag}><Text style={styles.promoTagText}>PROMO 15%</Text></View>
                <Text style={styles.promoTitle}>Buah Segar,{"\n"}Berkualitas Tinggi</Text>
                <Text style={styles.promoSubtitle}>Dapatkan buah berkualitas, tinggi vitamin dari tangan pertama.</Text>
                <TouchableOpacity style={styles.promoBtn}><Text style={styles.promoBtnText}>Belanja Sekarang→</Text></TouchableOpacity>
              </View>
              <Image source={require("../../assets/images/buahpot.png")} style={styles.promoRightImage} />
            </View>

            <View style={styles.promoBannerYellow}>
              <Image source={require("../../assets/images/ojek.png")} style={styles.promoImageTop} />
              <View>
                <Text style={styles.promoTitleYellow}>Segarnya,{"\n"}sampai rumah</Text>
                <Text style={styles.promoSubtitleYellow}>Gratis ongkir 10km!</Text>
                <TouchableOpacity style={styles.promoBtnYellow}><Text style={styles.promoBtnTextYellow}>Pesan Sekarang→</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* 👇 4. PASANG POPUP DI LUAR SCROLLVIEW AGAR MENGAMBANG */}
      <AddToCartPopup visible={showPopup} />
    </View>
  );
}