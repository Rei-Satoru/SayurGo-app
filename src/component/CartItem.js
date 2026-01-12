import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CartItem({
  item,
  checked,
  onToggle,
  onIncrease,
  onDecrease,
}) {
  // Prioritas: item.image -> item.gambar -> item._produk.foto_produk
  let imageSource = { uri: "https://placehold.co/100x100/png?text=No+Image" };

  const rawImg = item?.image || item?.gambar || (item?._produk && item._produk.foto_produk);

  if (rawImg) {
    if (typeof rawImg === "string") {
      imageSource = { uri: rawImg };
    } else if (rawImg.url) {
      // Handle format Xano: { url: "https://..." }
      imageSource = { uri: rawImg.url };
    } else if (rawImg.uri) {
      // Handle format ImagePicker: { uri: "..." }
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
            {item?.nama || "Produk"}
          </Text>
          <Text style={styles.weight} numberOfLines={1}>
            {item?.berat || "Satuan"}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            Rp {Number(item?.harga || 0).toLocaleString("id-ID")}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.stepperContainer}>
            <TouchableOpacity onPress={onDecrease} style={styles.stepBtn}>
              <Ionicons name="remove" size={16} color="#2E7D32" />
            </TouchableOpacity>

            <View style={styles.qtyBox}>
              <Text style={styles.qtyText}>{item?.qty ?? 1}</Text>
            </View>

            <TouchableOpacity onPress={onIncrease} style={styles.stepBtn}>
              <Ionicons name="add" size={16} color="#2E7D32" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#eee",
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
  },
});
