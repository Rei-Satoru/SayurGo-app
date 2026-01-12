<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react"; 
import {
=======
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
<<<<<<< HEAD
  ActivityIndicator
} from "react-native";
import { useSelector } from 'react-redux'; 
import styles from "../../src/styles/homeStyles";
import ProductCard from "../component/ProductCard";
import { useProducts } from "../hooks/useProducts"; 

// 👇 1. IMPORT HOOK & POPUP
import { useAddToCart } from "../hooks/useAddToCart";
import AddToCartPopup from "../component/AddToCartPopup";

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
            Cari Berdasarkan <Text style={styles.boldGreen}>Kategori</Text> ...
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
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
                  style={[
                    styles.categoryImage,
                    { width: 40, height: 40, marginBottom: 8 },
                  ]}
                />
                <Text style={styles.categoryLabel}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ===== Product Section ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Produk <Text style={styles.boldGreen}>Populer</Text>...
          </Text>

          {loading ? (
             <ActivityIndicator size="large" color="#2ecc71" style={{ marginTop: 20 }} />
          ) : (
             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
              {/* PERBAIKAN 2: Tambahkan (products || []) agar aman saat difilter */}
              {(products || [])
                .filter((p) => {
                    // Filter Nama (Search)
                    const productName = p.nama || p.name || p.nama_produk || "";
                    const matchesSearch = productName.toLowerCase().includes(search.toLowerCase());
                    
                    // Filter Rating (4 ke atas)
                    const isPopular = (p.rating || 0) >= 4; 

                    return matchesSearch && isPopular;
                })
                .map((item) => {
                  const normalized = {
                    id: item.id,
                    nama: item.nama_produk || "Tanpa Nama",
                    harga: item.harga || 0,
                    image: { uri: item.foto_produk?.url || item.foto_produk },
                    berat: item.berat ? `${item.berat} ${item.satuan || 'kg'}` : '1 kg',
                    jenis: item.kategori || item.jenis,
                    rating: item.rating || 0,
                    deskripsi: item.deskripsi || item.deskripsi_produk || "Deskripsi asli belum ada di database."
                  };
                  return (
                    <ProductCard 
                        key={`${item.jenis || 'prod'}-${item.id}`} 
                        item={normalized} 
                        compact 
                        // 👇 3. PASANG FUNGSI ADD TO CART KE COMPONENT CARD
                        onAddToCart={() => addToCart(normalized)}
                    />
                  );
                })}
             </ScrollView>
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
=======
} from 'react-native';
import styles from '../styles/homeStyles';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const { width } = Dimensions.get('window');
  const isSmall = width <= 420;
  const router = useRouter();

  const categories = [
    { id: 1, name: 'Sayur', icon: 'https://cdn-icons-png.flaticon.com/512/706/706164.png' },
    { id: 2, name: 'Buah', icon: 'https://cdn-icons-png.flaticon.com/512/415/415733.png' },
    { id: 4, name: 'Bumbu', icon: 'https://cdn-icons-png.flaticon.com/512/2747/2747737.png' },
  ];

  const products = [
    { id: 1, name: 'Bayam Segar', price: 'Rp 5.000', image: 'https://cdn-icons-png.flaticon.com/512/766/766336.png' },
    { id: 2, name: 'Tomat Merah', price: 'Rp 8.000', image: 'https://cdn-icons-png.flaticon.com/512/766/766330.png' },
    { id: 3, name: 'Beras Premium 5kg', price: 'Rp 70.000', image: 'https://cdn-icons-png.flaticon.com/512/2738/2738730.png' },
    { id: 4, name: 'Telur Ayam 1kg', price: 'Rp 25.000', image: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ===== Brand (top-left, above search) ===== */}
      <View style={styles.brandContainer}>
        <View style={styles.brandWrapper}>
          <Text style={styles.brandSayur}>Sayur.</Text>
          <Text style={styles.brandGo}>GO</Text>
        </View>
      </View>

      {/* ===== Header ===== */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>Belanja bahan segar hari ini yuk!</Text>
        </View>
        <Image
          source={require('../../assets/images/gambar1.jpg')}
          style={styles.avatar}
        />
      </View>

      {/* ===== Search Bar ===== */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari sayur, buah, atau sembako..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ===== Ojek Advertisement ===== */}
      <View style={styles.ojekAdContainer}>
        <View style={styles.ojekAdContent}>
          <Text style={styles.ojekAdTitle}>Segarnya sampai rumah, ongkirnya 10Km !!</Text>
          <TouchableOpacity style={styles.ojekAdButton}>
            <Text style={styles.ojekAdButtonText}>Belanja Sekarang →</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/images/ojek.png')}
          style={styles.ojekAdImage}
          resizeMode="contain"
        />
      </View>

      {/* ===== Banner ===== */}
      <View style={styles.banner}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-vector/organic-flat-vegetables-supermarket-illustration_23-2148932048.jpg',
          }}
          style={styles.bannerImage}
        />
      </View>

      {/* ===== Category ===== */}
      <Text style={styles.sectionTitle}>Kategori</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => {
              console.warn('Category pressed:', item.name);
              const key = item.name.toLowerCase();
              if (key === 'sayur') router.push('/sayur');
              else if (key === 'buah') router.push('/buah');
              else if (key === 'bumbu') router.push('/bumbu');
            }}
          >
            <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />

      {/* ===== Product Section ===== */}
      <Text style={styles.sectionTitle}>Produk Unggulan</Text>
      <FlatList
        horizontal
        data={products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />

      {/* ===== Promo (Buah Segar) ===== */}
      <View style={[styles.promo, isSmall && styles.promoSmall]}>
        <View style={styles.promoBadge}>
          <Text style={styles.promoBadgeText}>Diskon 15%</Text>
        </View>
        <View style={[styles.promoTextWrap, isSmall && styles.promoTextWrapSmall]}>
          <Text style={[styles.promoTitle, isSmall && styles.promoTitleSmall]}>Buah Segar, Berkualitas Tinggi</Text>
          <Text style={[styles.promoDesc, isSmall && styles.promoDescSmall]}>Dapatkan buah berkualitas, tinggi vitamin dari tangan pertama.</Text>
        </View>
        <View style={[styles.promoImageContainer, isSmall && styles.promoImageContainerSmall]}>
          <Image source={require('../../assets/images/buahpot.png')} style={[styles.promoImage, isSmall && styles.promoImageSmall]} resizeMode="contain" />
        </View>
      </View>
    </ScrollView>
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
  );
}