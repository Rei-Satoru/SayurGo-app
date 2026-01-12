import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

// --- HOOKS & COMPONENTS ---
import { useAddToCart } from "../hooks/useAddToCart"; 
import AddToCartPopup from "../component/AddToCartPopup"; // 👈 1. IMPORT POPUP NYA

// --- STYLES ---
import styles from "../styles/detailproductStyles"; 

export default function DetailProductScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    
    // 👇 2. AMBIL 'showPopup' DARI HOOK
    const { addToCart, showPopup } = useAddToCart(); 

    // 1. NORMALISASI DATA

    const fallbackImage = require("../../assets/images/vegetables.png");
    let finalImage = fallbackImage;

    // Logic Gambar: Prioritaskan params.foto_produk
    if (params.foto_produk) {
        if (typeof params.foto_produk === 'string' && params.foto_produk.startsWith('http')) {
             finalImage = { uri: params.foto_produk };
        } else {
             finalImage = { uri: params.foto_produk };
        }
    }

    const product = {
        id: params.id, 
        nama: params.nama || params.nama_produk || "Tanpa Nama",
        harga: params.harga ? Number(params.harga) : 0, 
        berat: params.berat || "1 kg",
        jenis: params.jenis || "Umum",
        deskripsi: params.deskripsi || "Produk segar pilihan dengan kualitas terbaik langsung dari petani.",
        image: finalImage
    };

    // Loading State
    if (!product.id) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
                <Text>Loading data produk...</Text>
            </View>
        );
    }

    // 2. FUNGSI CART & BUY (VIA HOOK)
    
    const handleAddToCart = () => {
        // Panggil fungsi dari Hook useAddToCart
        // (Popup otomatis muncul karena logicnya ada di dalam hook ini)
        addToCart({
            id: product.id,
            nama: product.nama,
            harga: product.harga,
            image: product.image,
            berat: product.berat,
            jenis: product.jenis,
        });
        
        // Alert dihapus, diganti popup
    };

    const handleBuyNow = () => {
        const buyItem = { ...product, qty: 1 };
        
        // Simpan ke database via Hook
        addToCart({
            id: product.id,
            nama: product.nama,
            harga: product.harga,
            image: product.image,
            berat: product.berat,
            jenis: product.jenis,
        });
        
        // Ke halaman Checkout
        router.push({ 
            pathname: "/checkout", 
            params: { items: JSON.stringify([buyItem]) } 
        });
    };

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detail Produk</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* IMAGE */}
                <View style={styles.imageWrapper}>
                    <Image
                        source={product.image}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>

                {/* CONTENT */}
                <View style={styles.contentCard}>
                    <Text style={styles.productName}>{product.nama}</Text>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                        <Text style={styles.productWeight}>{product.berat}</Text>
                        <Text style={{ color: '#2ecc71', fontWeight: 'bold' }}>{product.jenis}</Text>
                    </View>

                    <Text style={styles.price}>
                        Rp {product.harga.toLocaleString('id-ID')}
                    </Text>

                    <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 15 }} />

                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Deskripsi</Text>
                    <Text style={styles.description}>
                        {product.deskripsi}
                    </Text>
                </View>
            </ScrollView>

            {/* BOTTOM BAR */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.addCartButton}
                    onPress={handleAddToCart}
                    activeOpacity={0.85}
                >
                    <Ionicons name="cart-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>Keranjang</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buyNowButton}
                    onPress={handleBuyNow}
                    activeOpacity={0.85}
                >
                    <Text style={styles.buttonText}>Beli Sekarang</Text>
                </TouchableOpacity>
            </View>

            {/* 👇 3. PASANG POPUP DISINI (PALING BAWAH) */}
            <AddToCartPopup visible={showPopup} />
        </View>
    );
}