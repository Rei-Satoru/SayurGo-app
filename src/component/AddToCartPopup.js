import React from "react";
import { Modal, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AddToCartPopup({ visible }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 220,                 // 🔥 KUNCI LEBAR
            backgroundColor: "rgba(40,40,40,0.9)",
            paddingVertical: 20,
            paddingHorizontal: 16,
            borderRadius: 16, 
            alignItems: "center",
          }}
        >
          {/* ICON */}
          <Ionicons
            name="checkmark-circle"
            size={40}
            color="#4CAF50"
            style={{ marginBottom: 10 }}
          />

          {/* TEXT */}
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "600",
              textAlign: "center",
              lineHeight: 20,           // 🔥 BIAR RAPI KE BAWAH
            }}
          >
            Produk berhasil ditambahkan{"\n"}
            ke Keranjang!
          </Text>
        </View>
      </View>
    </Modal>
  );
}
