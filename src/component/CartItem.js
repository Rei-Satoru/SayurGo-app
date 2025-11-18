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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});