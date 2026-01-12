import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux';
import AddToCartPopup from "../component/AddToCartPopup";
import BottomTabBar from "../component/BottomTabBar";
import ProductCard from "../component/ProductCard";
import { useAddToCart } from "../hooks/useAddToCart";
import { useProducts } from "../hooks/useProducts";
import categoryStyles from "../styles/categoryScreenStyles";

export default function LaukScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { products, loading } = useProducts();
  const { addToCart, showPopup } = useAddToCart();
  
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.length;

  const filterProducts = products
    .filter((item) => {
      const category = (item.kategori || "").toLowerCase();
      const name = (item.nama_produk || "").toLowerCase();
      const isLauk = category.includes("lauk") || category.includes("ikan") || category.includes("daging");
      return isLauk && (search === "" || name.includes(search.toLowerCase()));
    })
    .map(item => ({
      id: item.id,
      nama: item.nama_produk || "Tanpa Nama",
      name: item.nama_produk || "Tanpa Nama",
      harga: item.harga || 0,
      price: item.harga || 0,
      image: item.foto_produk?.url ? { uri: item.foto_produk.url } : (item.foto_produk ? { uri: item.foto_produk } : null),
      jenis: item.kategori,
      category: item.kategori,
      berat: item.berat ? `${item.berat} ${item.satuan || 'kg'}` : '1 kg',
      weight: item.berat ? `${item.berat} ${item.satuan || 'kg'}` : '1 kg',
      rating: item.rating || 0,
      deskripsi: item.deskripsi || item.deskripsi_produk || ""
    }));

  return (
    <SafeAreaView style={[categoryStyles.container, { flex: 1 }]} edges={["top"]}>
      <View style={{ flex: 1 }}>
        {/* Top Search Bar */}
        <View style={categoryStyles.topSearchBar}>
          <View style={categoryStyles.searchInputContainer}>
            <TextInput
              style={categoryStyles.searchInput}
              placeholder="Cari lauk/ikan..."
              placeholderTextColor="#BBB"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity onPress={() => router.push("/cart")} style={categoryStyles.headerIcon}>
            <Ionicons name="cart-outline" size={26} color="#FFFFFF" />
            {cartCount > 0 && (
              <View style={categoryStyles.cartBadge}>
                <Text style={categoryStyles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Header Section */}
        <View style={categoryStyles.headerSection}>
          <Text style={categoryStyles.categoryTitle}>
            Kategori <Text style={categoryStyles.boldGreen}>Lauk</Text>
          </Text>
          <Text style={categoryStyles.headerSubtitle}>Lauk berkualitas untuk keluarga tercinta</Text>
        </View>

        {/* Product List */}
        {loading ? (
           <View style={categoryStyles.loadingContainer}>
             <ActivityIndicator size="large" color="#2E7D32" />
           </View>
        ) : filterProducts.length > 0 ? (
          <FlatList
            contentContainerStyle={categoryStyles.contentContainerStyle}
            data={filterProducts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={categoryStyles.columnWrapperStyle}
            renderItem={({ item }) => (
              <ProductCard 
                item={item} 
                onAddToCart={() => addToCart(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={categoryStyles.emptyContainer}>
            <Ionicons name="fish-outline" size={60} color="#DDD" />
            <Text style={categoryStyles.emptyText}>Lauk tidak tersedia saat ini</Text>
          </View>
        )}
      </View>
      
      <AddToCartPopup visible={showPopup} />
      <BottomTabBar />
    </SafeAreaView>
  );
}