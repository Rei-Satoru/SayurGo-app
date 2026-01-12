import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";

// 👇 1. HAPUS IMPORT CONTEXT & DUMMY DATA LAMA
// import { CartContext } from "../context/CartContext";
// import { BUAH_DATA } ... dst

import ProductCard from "../component/ProductCard";

// 👇 2. IMPORT HOOKS & POPUP
import { useProducts } from "../hooks/useProducts";
import { useAddToCart } from "../hooks/useAddToCart";
import AddToCartPopup from "../component/AddToCartPopup";

export default function ExploreScreen() {
  const [search, setSearch] = useState("");

  // 👇 3. PANGGIL DATA DARI API & HOOK CART
  const { products, loading } = useProducts();
  const { addToCart, showPopup } = useAddToCart();

  // 👇 4. LOGIC FILTER PENCARIAN (Updated fields)
  const filteredProducts = (products || []).filter((p) => {
    const productName = p.nama_produk || p.nama || p.name || "";
    return productName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Cari Bahan Segar</Text>
          <Ionicons name="search" size={24} color="#2E7D32" />
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari sayuran, buah, lauk, bumbu..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* IKLAN */}
        <View style={styles.ojekAdContainer}>
          <View style={styles.ojekAdContent}>
            <Text style={styles.ojekAdTitle}>
              Segarnya sampai rumah, ongkirnya 10Km !!
            </Text>
            <TouchableOpacity style={styles.ojekAdButton}>
              <Text style={styles.ojekAdButtonText}>
                Belanja Sekarang →
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../assets/images/ojek.png")}
            style={styles.ojekAdImage}
            resizeMode="contain"
          />
        </View>

        {/* PRODUK */}
        <Text style={styles.sectionTitle}>Produk</Text>

        {/* 👇 5. TAMPILKAN LOADING / DATA */}
        {loading ? (
             <ActivityIndicator size="large" color="#2E7D32" style={{ marginTop: 20 }} />
        ) : (
            <View style={styles.productsContainer}>
            {filteredProducts.map((item) => {
                // Normalisasi Data API ke Format Card
                const normalized = {
                    id: item.id,
                    nama: item.nama_produk || item.nama || "Tanpa Nama",
                    harga: item.harga || 0,
                    // Handle gambar dari API (bisa object url atau string)
                    image: { uri: item.foto_produk?.url || item.foto_produk },
                    berat: item.berat ? `${item.berat} ${item.satuan || 'kg'}` : '1 kg',
                    jenis: item.kategori || item.jenis,
                    rating: item.rating || 0,
                    deskripsi: item.deskripsi || item.deskripsi_produk
                };

                return (
                    <ProductCard 
                        key={item.id} 
                        item={normalized} 
                        // 👇 Pasang fungsi Add to Cart & Popup
                        onAddToCart={() => addToCart(normalized)}
                    />
                );
            })}
            </View>
        )}
        
        {/* Tambahan padding bawah agar tidak kepotong */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* 👇 6. PASANG POPUP */}
      <AddToCartPopup visible={showPopup} />
    </View>
  );
}

//STYLE (TIDAK ADA YANG DIUBAH)//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E7D32",
  },

  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
  },
  searchInput: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
  },

  ojekAdContainer: {
    flexDirection: "row",
    backgroundColor: "#E8F5E9",
    borderRadius: 16,
    margin: 16,
    padding: 12,
  },
  ojekAdContent: { flex: 1 },
  ojekAdTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  ojekAdButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  ojekAdButtonText: {
    color: "#FFF",
    fontSize: 12,
  },
  ojekAdImage: {
    width: 90,
    height: 90,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 16,
    marginBottom: 8,
  },

  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});