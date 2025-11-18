import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CartItem from '../component/CartItem';
import { CartContext } from '../context/CartContext';

export default function CartScreen() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearAllCart } = useContext(CartContext);
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => (
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    ));
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === cart.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cart.map(i => i.id));
    }
  };

  // DELETE ITEM
  const deleteItem = (id) => {
    removeFromCart(id);
  };

  // DELETE ALL
  const clearCart = () => {
    clearAllCart();
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.harga || item.price) * item.qty, 0);

  // Calculate total items
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <View style={styles.container}>
      {/* Header dengan badge */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Keranjang Saya ({totalItems})</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="refresh" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.empty}>Keranjang kamu masih kosong</Text>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                checked={selectedIds.includes(item.id)}
                onToggle={() => toggleSelect(item.id)}
                onIncrease={() => increaseQty(item.id)}
                onDecrease={() => decreaseQty(item.id)}
                onDelete={() => deleteItem(item.id)}
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 12 }}
          />

          {/* Voucher & Summary Section */}
          <View style={styles.summarySection}>
            {/* Voucher */}
            <TouchableOpacity style={styles.voucherBox}>
              <Ionicons name="ticket" size={20} color="#2E7D32" />
              <Text style={styles.voucherText}>Gunakan Voucher</Text>
              <Text style={styles.voucherValue}>Rp 0</Text>
            </TouchableOpacity>

            {/* Total Items */}
            <View style={styles.totalRow}>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity style={styles.checkbox} onPress={toggleSelectAll}>
                  {selectedIds.length === cart.length && cart.length > 0 ? (
                    <Ionicons name="checkmark" size={14} color="#2E7D32" />
                  ) : null}
                </TouchableOpacity>
                <Text style={styles.selectAllText}>Pilih Semua Produk yang Anda Inginkan</Text>
              </View>
            </View>

            {/* Summary */}
            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>Rp {totalPrice.toLocaleString()}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total</Text>
                <Text style={styles.totalValue}>Rp {totalPrice.toLocaleString()}</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              {cart.length > 1 && (
                <TouchableOpacity style={styles.deleteAllBtn} onPress={clearCart}>
                  <Text style={styles.deleteAllText}>Hapus Semua</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={[styles.checkoutBtn, cart.length === 1 && styles.checkoutBtnFull]}>
                <Text style={styles.checkoutText}>Lanjutkan Belanja</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2E7D32',
    elevation: 2,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },

  content: {
    flex: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  empty: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },

  summarySection: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },

  voucherBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    gap: 10,
    elevation: 1,
  },

  voucherText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  voucherValue: {
    fontSize: 12,
    color: '#999',
  },

  totalRow: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectAllText: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },

  summary: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },

  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
  },

  deleteAllBtn: {
    flex: 0.4,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    elevation: 1,
  },

  deleteAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },

  checkoutBtn: {
    flex: 0.6,
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },

  checkoutBtnFull: {
    flex: 1,
  },

  checkoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});