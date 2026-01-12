import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// 1. IMPORT REDUX TOOLS
import { useDispatch } from "react-redux";
// Pastikan path ini sesuai dengan lokasi file slice kamu
import { addToCartApi } from "../features/entries/cartSlice";

// HAPUS CartContext (Sudah tidak dipakai)
// import { CartContext } from "../context/CartContext";

// FavoriteContext tetap dipakai (karena Provider-nya masih ada di _layout)
import { FavoriteContext } from "../context/FavoriteContext";

import styles from "../styles/ProductCardStyles";

// 👇 TERIMA PROP 'onAddToCart' DISINI
export default function ProductCard({ item, compact = false, onAddToCart }) {
  const router = useRouter();
  
  // 2. SETUP DISPATCH REDUX
  const dispatch = useDispatch();

  const { toggleFavorite, isFavorite } = useContext(FavoriteContext);

  // ==========================================
  // NORMALISASI DATA
  // ==========================================
  const displayId = item.id;
  const displayNama = item.nama || item.name || item.nama_produk || "Tanpa Nama";
  const displayHarga = item.harga || item.price || 0;
  
  // Logic Gambar
  const displayImage = item.image || item.gambar || item.foto_produk;
  
  const displayBerat = item.berat || item.weight || "1 kg";
  const displayJenis = item.jenis || item.category || "Umum";
  const displayDeskripsi = item.deskripsi || "Deskripsi produk belum tersedia.";
  const displayRating = item.rating ?? null;

  // ID unik untuk Favorite
  const favoriteId =
    typeof displayId === "string" && displayId.includes("-")
      ? displayId
      : `${(displayJenis || "")}-${displayId}`;

  // LOGIKA NAVIGASI (Fix Image URL)
  const handlePress = () => {
    let imageParam = "";
    
    // Cek berbagai kemungkinan format gambar dari API
    if (displayImage) {
        if (typeof displayImage === 'string') {
            imageParam = displayImage; 
        } else if (displayImage.uri) {
            imageParam = displayImage.uri;
        } else if (displayImage.url) { 
            // 👈 Support .url sesuai permintaan
            imageParam = displayImage.url; 
        }
    }

    router.push({
      pathname: "/detailproduct",
      params: { 
        id: displayId,
        nama: displayNama,
        harga: displayHarga,
        foto_produk: imageParam, 
        berat: displayBerat,
        jenis: displayJenis,
        deskripsi: displayDeskripsi
      },
    });
  };

  // 3. FUNGSI ADD TO CART (MODIFIKASI)
  const handleAddToCart = () => {
    // 👇 PRIORITAS: Jika Parent (Home) mengirim fungsi onAddToCart, pakai itu!
    // Ini agar POPUP dari Hook useAddToCart bisa muncul.
    if (onAddToCart) {
        onAddToCart();
        return;
    }

    // FALLBACK: Jika tidak ada onAddToCart, pakai Redux manual (cara lama)
    dispatch(addToCartApi({
      id: displayId,
      nama: displayNama,
      harga: displayHarga,
      image: displayImage, 
      berat: displayBerat,
      jenis: displayJenis,
    }));
    
    // Opsional: Alert agar user tahu tombol ditekan (hanya jika popup tidak ada)
    // alert("Produk ditambahkan ke keranjang"); 
  };

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      activeOpacity={0.9}
      onPress={handlePress} 
    >
      {/* ❤️ FAVORITE */}
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={(e) => {
          e.stopPropagation();
          toggleFavorite({
            id: favoriteId,
            name: displayNama,
            image: displayImage,
            category: displayJenis,
            harga: displayHarga,
            berat: displayBerat,
          });
        }}
      >
        <Ionicons
          name={isFavorite(favoriteId) ? "heart" : "heart-outline"}
          size={16}
          color={isFavorite(favoriteId) ? "#E53935" : "#999"}
        />
      </TouchableOpacity>

      {/* IMAGE */}
      <Image 
        source={displayImage} 
        style={[styles.image, compact && styles.cardCompactImage]} 
        resizeMode="contain" 
      />

      {/* RATING */}
      {displayRating ? (
        <View style={compact ? styles.ratingBoxCompact : styles.ratingBox} pointerEvents="none">
          <Text style={styles.ratingText}>⭐ {displayRating}</Text>
        </View>
      ) : null}

      {/* INFO */}
      <Text style={styles.name} numberOfLines={1}>
        {displayNama}
      </Text>
      <Text style={styles.weight}>{displayBerat}</Text>

      {/* PRICE + CART */}
      <View style={styles.bottomRow}>
        <Text style={styles.price}>
          Rp {Number(displayHarga).toLocaleString('id-ID')}
        </Text>

        {/* 🛒 ADD TO CART */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={handleAddToCart} // Panggil fungsi yang sudah diupdate di atas
          activeOpacity={0.8}
        >
          <Image
            source={require("../../assets/images/carticons.png")}
            style={styles.cartIcon}
          />
          <Text style={styles.cartButtonText}>tambah</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

