<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux';
import { useProducts } from "../hooks/useProducts";
import styles from "../../src/styles/homeStyles";
import BottomTabBar from "../component/BottomTabBar";
import ProductCard from "../component/ProductCard";

// 👇 1. IMPORT
import { useAddToCart } from "../hooks/useAddToCart";
import AddToCartPopup from "../component/AddToCartPopup";

export default function SayurScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  
  const { products, loading } = useProducts();

  // 👇 2. HOOK
  const { addToCart, showPopup } = useAddToCart();

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }} edges={["top"]}>
      <View style={{ flex: 1 }}>
        <View style={styles.topSearchBar}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Cari sayuran..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity onPress={() => router.push("/cart")} style={styles.headerIcon}>
            <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 18, fontWeight: "700", color: "#555", marginTop: 16, marginLeft: 16 }}>
          Kategori <Text style={{ color: "#2E7D32" }}>Sayuran</Text> ...
        </Text>

        {loading ? (
           <ActivityIndicator size="large" color="#2E7D32" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            contentContainerStyle={{ padding: 15 }}
            data={products
              .filter((item) => {
                const category = (item.kategori || "").toLowerCase();
                const name = (item.nama_produk || "").toLowerCase();
                return category.includes("sayur") && name.includes(search.toLowerCase());
              })
              .map(item => ({
                id: item.id,
                nama: item.nama_produk || "Tanpa Nama",
                harga: item.harga || 0,
                image: { uri: item.foto_produk?.url },
                jenis: item.kategori,
                berat: item.berat ? `${item.berat} ${item.satuan || ''}` : '1 kg',
                rating: item.rating || 0,
                deskripsi: item.deskripsi || item.deskripsi_produk || "Deskripsi asli belum ada di database.",
              }))
            }
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
                // 👇 3. PROP ADD TO CART
                <ProductCard 
                    item={item} 
                    onAddToCart={() => addToCart(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      
      {/* 👇 4. POPUP */}
      <AddToCartPopup visible={showPopup} />

      <BottomTabBar />
    </SafeAreaView>
  );
}
=======
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../component/ProductCard';
import { SAYUR_DATA } from '../data/SayurData';

export default function SayurScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const filtered = SAYUR_DATA.filter((i) => i.nama.toLowerCase().includes(query.toLowerCase()));
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }} edges={['top', 'bottom']}>
      {/* In-screen header to ensure back is visible on all devices */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
          <Ionicons name="chevron-back" size={26} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#111', marginLeft: 6 }}>Sayur</Text>
      </View>
      {/* Search bar to filter vegetables */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Cari sayuran..."
          placeholderTextColor="#888"
          style={{ backgroundColor: '#E8F5E9', borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10 }}
        />
      </View>
      <FlatList
        contentContainerStyle={{ padding: 15 }}
        data={filtered}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </SafeAreaView>
  );
}
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
