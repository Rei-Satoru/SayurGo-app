import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useProducts } from "../hooks/useProducts"; 
import styles from '../../src/styles/homeStyles';
import BottomTabBar from '../component/BottomTabBar';
import ProductCard from '../component/ProductCard';

// 👇 1. IMPORT HOOK & POPUP
import { useAddToCart } from "../hooks/useAddToCart";
import AddToCartPopup from "../component/AddToCartPopup";

export default function BuahScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const { products, loading } = useProducts();
  
  // 👇 2. PANGGIL HOOK
  const { addToCart, showPopup } = useAddToCart();

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }} edges={['top']}>
      <View style={{ flex: 1 }}>
        <View style={styles.topSearchBar}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Cari buah disini..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
          </View> 
          <TouchableOpacity onPress={() => router.push('/cart')} style={styles.headerIcon}>
            <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 18, fontWeight: '700', color: '#555', marginTop: 16, marginLeft: 16 }}>
          Kategori <Text style={{ color: '#2E7D32' }}>Buah</Text> ...
        </Text>

        {loading ? (
           <ActivityIndicator size="large" color="#2E7D32" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            contentContainerStyle={{ padding: 15 }}
            data={products
              .filter(item => {
                 const category = (item.kategori || "").toLowerCase();
                 const name = (item.nama_produk || "").toLowerCase();
                 return category.includes("buah") && name.includes(search.toLowerCase());
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
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
                // 👇 3. PASANG PROP onAddToCart
                <ProductCard 
                    item={item} 
                    onAddToCart={() => addToCart(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ color: '#999' }}>Tidak ada produk buah ditemukan.</Text>
                </View>
            )}
          />
        )}
      </View>
      
      {/* 👇 4. PASANG POPUP */}
      <AddToCartPopup visible={showPopup} />
      
      <BottomTabBar />
    </SafeAreaView>
  );
}