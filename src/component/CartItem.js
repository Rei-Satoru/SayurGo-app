<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CartItem({ item, checked, onToggle, onIncrease, onDecrease }) {
  
  // 1. LOGIC GAMBAR (Disederhanakan & Diperbaiki)
  // Prioritas: item.image -> item.gambar -> item._produk.foto_produk
  let imageSource = { uri: "https://placehold.co/100x100/png?text=No+Image" };
  
  // Ambil raw source
  const rawImg = item.image || item.gambar || (item._produk && item._produk.foto_produk);

  if (rawImg) {
    if (typeof rawImg === 'string') {
        imageSource = { uri: rawImg };
    } else if (rawImg.url) {
        // Handle format Xano: { url: "https://..." }
        imageSource = { uri: rawImg.url };
    } else if (rawImg.uri) {
        // Handle format ImagePicker
        imageSource = rawImg;
    }
  }

  return (
    <View style={styles.container}>
      {/* CHECKBOX */}
      <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, checked && styles.checked]}>
          {checked && <Ionicons name="checkmark" size={12} color="#fff" />}
        </View>
      </TouchableOpacity>

      {/* GAMBAR */}
      <Image source={imageSource} style={styles.image} resizeMode="cover" />

      {/* KONTEN */}
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {item.nama || "Produk"}
          </Text>
          <Text style={styles.weight} numberOfLines={1}>
            {item.berat || "Satuan"}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            Rp {Number(item.harga || 0).toLocaleString("id-ID")}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.stepperContainer}>
            <TouchableOpacity onPress={onDecrease} style={styles.stepBtn}>
              <Ionicons name="remove" size={16} color="#2E7D32" />
            </TouchableOpacity>

            <View style={styles.qtyBox}>
              <Text style={styles.qtyText}>{item.qty}</Text>
            </View>

            <TouchableOpacity onPress={onIncrease} style={styles.stepBtn}>
              <Ionicons name="add" size={16} color="#2E7D32" />
            </TouchableOpacity>
          </View>
=======
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartItem({ item, onIncrease, onDecrease, onDelete, checked = false, onToggle }) {
  // Handle both old format (name, price) and new format (nama, harga)
  const name = item.nama || item.name;
  const category = item.jenis || item.category;
  const price = item.harga || item.price;
  const image = item.image;

  return (
    <View style={styles.card}>
      {/* CHECKBOX */}
      <TouchableOpacity style={styles.checkboxWrap} onPress={onToggle} activeOpacity={0.7}>
        {checked ? (
          <View style={styles.checkboxChecked}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </View>
        ) : (
          <View style={styles.checkbox} />
        )}
      </TouchableOpacity>

      {/* GAMBAR PRODUK */}
      <Image source={typeof image === 'string' ? { uri: image } : image} style={styles.image} />

      {/* INFO PRODUK */}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>

        {/* HARGA */}
        <Text style={styles.price}>
          Rp {price.toLocaleString ? price.toLocaleString() : price}
        </Text>

        {/* QTY */}
        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qtyNumber}>{item.qty}</Text>

          <TouchableOpacity style={styles.qtyBtn} onPress={onIncrease}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* DELETE (below qty) */}
        <View style={styles.deleteRow}>
          <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
            <Text style={styles.deleteText}>Hapus</Text>
          </TouchableOpacity>
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  checkboxContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#eee", // Warna abu kalau gambar loading
    marginRight: 12,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    justifyContent: "center",
  },
  infoContainer: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    width: "100%",
    textAlign: "left",
  },
  weight: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
    width: "100%",
    textAlign: "left",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FA591D",
    width: "100%",
    textAlign: "left",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    height: 32,
    flexShrink: 0,
  },
  stepBtn: {
    width: 32,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  qtyBox: {
    minWidth: 24,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#eee",
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
=======
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 14,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { height: 2 },
  },

  image: {
    width: 80,
    height: 80,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },

  category: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 6,
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  qtyBtn: {
    width: 32,
    height: 32,
    backgroundColor: '#eeeeee',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyText: {
    fontSize: 20,
    color: '#333',
  },

  qtyNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 12,
    color: '#333',
  },

  deleteBtn: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  deleteText: {
    fontSize: 12,
    color: '#d32f2f',
    fontWeight: 'bold',
  },

  deleteRow: {
    marginTop: 8,
    alignItems: 'flex-end',
  },

  checkboxWrap: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
  },
});