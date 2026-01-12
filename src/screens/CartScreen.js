import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/entries/cartSlice";

import CartItem from "../component/CartItem";
import { PromoContext } from "../context/PromoContext";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";
import { useUpdateCartItem } from "../hooks/useUpdateCartItem";

import styles from "../styles/cartStyles";

export default function CartScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);

  const { increaseQty, decreaseQty } = useUpdateCartItem();
  const { removeCartItem } = useRemoveFromCart();

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchCart());
    }, [dispatch])
  );

  const coinLogo = require("../../assets/images/logo.png");

  const [selectedIds, setSelectedIds] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const cartList = cart || [];
  const allSelected =
    cartList.length > 0 && selectedIds.length === cartList.length;

  /* ===============================
     LOGIC CODE 2 (AMAN)
  =============================== */
  const normalizeItem = (item) => {
    const p = item._produk || item.produk_data || item;
    return {
      id: item.id,
      product_id: p.id,
      nama: p.nama_produk || p.nama || item.nama || "Tanpa Nama",
      harga: Number(p.harga || item.harga || 0),
      image: p.foto_produk || p.image || item.image,
      berat: p.berat || item.berat || "1kg",
      jenis: p.kategori || p.jenis || item.jenis || "Lainnya",
      qty: Number(item.qty || item.quantity || 1),
    };
  };

  const groupedCart = cartList.reduce((acc, rawItem) => {
    const item = normalizeItem(rawItem);
    const category = item.jenis;
    if (!acc[category]) acc[category] = [];
    acc[category].push(rawItem);
    return acc;
  }, {});

  const categoryOrder = ["Sayuran", "Buah", "Bumbu", "Lauk"];
  const otherCategories = Object.keys(groupedCart).filter(
    (c) => !categoryOrder.includes(c)
  );
  const categories = [...categoryOrder, ...otherCategories].filter(
    (cat) => groupedCart[cat]
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(cartList.map((item) => item.id));
  };

  const totalPrice = cartList
    .filter((rawItem) => selectedIds.includes(rawItem.id))
    .reduce((sum, rawItem) => {
      const item = normalizeItem(rawItem);
      return sum + item.harga * item.qty;
    }, 0);

  const selectedItems = cartList
    .filter((rawItem) => selectedIds.includes(rawItem.id))
    .map((rawItem) => normalizeItem(rawItem));

  const { selectedVoucher, useCoin, setUseCoin, coinBalance } =
    useContext(PromoContext);

  if (cartStatus === "loading" && cartList.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  /* ===============================
     UI
  =============================== */
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Keranjang Saya ({cartList.length})
          </Text>
        </View>

        <TouchableOpacity onPress={() => setEditMode(!editMode)}>
          <Text style={styles.editText}>{editMode ? "Selesai" : "Ubah"}</Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      {cartList.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Ionicons name="cart-outline" size={64} color="#ccc" />
          <Text style={{ color: "#999", marginTop: 10 }}>
            Keranjang masih kosong
          </Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 260 }}
          renderItem={({ item: category }) => {
            const items = groupedCart[category];
            const allChecked = items.every((i) =>
              selectedIds.includes(i.id)
            );

            return (
              <View style={styles.categoryCard}>
                <TouchableOpacity
                  style={styles.categoryHeader}
                  onPress={() => {
                    if (allChecked) {
                      setSelectedIds((prev) =>
                        prev.filter(
                          (id) => !items.some((i) => i.id === id)
                        )
                      );
                    } else {
                      setSelectedIds((prev) => [
                        ...new Set([...prev, ...items.map((i) => i.id)]),
                      ]);
                    }
                  }}
                >
                  <View
                    style={[
                      styles.checkbox,
                      !allChecked && styles.checkboxOff,
                    ]}
                  >
                    {allChecked && (
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.categoryTitle}>{category}</Text>
                </TouchableOpacity>

                {items.map((rawItem) => {
                  const item = normalizeItem(rawItem);
                  return (
                    <CartItem
                      key={rawItem.id}
                      item={item}
                      checked={selectedIds.includes(rawItem.id)}
                      onToggle={() => toggleSelect(rawItem.id)}
                      onIncrease={() => increaseQty(rawItem.id, item.qty)}
                      onDecrease={() => decreaseQty(rawItem.id, item.qty)}
                    />
                  );
                })}
              </View>
            );
          }}
        />
      )}

      {/* STICKY BOTTOM */}
      <View style={styles.stickyContainer}>
        {!editMode && (
          <TouchableOpacity
            style={styles.voucherRow}
            onPress={() =>
              router.push({
                pathname: "/voucher",
                params: { items: JSON.stringify(selectedItems) },
              })
            }
          >
            <Ionicons name="ticket-outline" size={18} color="#FFA500" />
            <Text style={styles.voucherText}>Voucher & Ongkir</Text>
            <Text style={styles.voucherRight}>
              {selectedVoucher ? selectedVoucher.id : "Gunakan/masukkan kode"}
            </Text>
          </TouchableOpacity>
        )}

        {!editMode && (
          <View style={styles.coinRow}>
            <View style={styles.coinLeft}>
              <Image source={coinLogo} style={styles.coinIcon} />
              <Text style={styles.coinText}>
                Tukarkan koin ({coinBalance.toLocaleString()}){" "}
                <Text style={styles.coinBrand}>Sayur.GO</Text>
              </Text>
            </View>
            <Switch
              value={useCoin}
              onValueChange={setUseCoin}
              disabled={coinBalance === 0 || selectedIds.length === 0}
              trackColor={{ false: "#ccc", true: "#2E7D32" }}
            />
          </View>
        )}

        {/* CHECKOUT / EDIT MODE */}
        <View style={styles.checkoutRow}>
          <TouchableOpacity style={styles.selectAll} onPress={toggleSelectAll}>
            <View
              style={[styles.checkbox, !allSelected && styles.checkboxOff]}
            >
              {allSelected && (
                <Ionicons name="checkmark" size={14} color="#fff" />
              )}
            </View>
            <Text style={styles.selectAllText}>Semua</Text>
          </TouchableOpacity>

          {editMode ? (
            <View style={styles.editActions}>
              <TouchableOpacity
                disabled={selectedIds.length === 0}
                style={[
                  styles.deleteBtnBottom,
                  selectedIds.length === 0 && styles.checkoutDisabled,
                ]}
                onPress={() => {
                  selectedIds.forEach((id) => removeCartItem(id));
                  setSelectedIds([]);
                }}
              >
                <Text style={styles.deleteTextBottom}>
                  Hapus ({selectedIds.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={selectedIds.length === 0}
                style={[
                  styles.favBtn,
                  selectedIds.length === 0 && styles.checkoutDisabled,
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/profile",
                    params: {
                      tab: "favorites",
                      items: JSON.stringify(selectedItems),
                    },
                  })
                }
              >
                <Text style={styles.favText}>Favoritkan</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.rightBox}>
              <View style={styles.priceBox}>
                <Text style={styles.totalText}>
                  Rp{totalPrice.toLocaleString("id-ID")}
                </Text>
              </View>

              <TouchableOpacity
                disabled={selectedIds.length === 0}
                style={[
                  styles.checkoutBtn,
                  selectedIds.length === 0 && styles.checkoutDisabled,
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/checkout",
                    params: { items: JSON.stringify(selectedItems) },
                  })
                }
              >
                <Text style={styles.checkoutText}>
                  Checkout ({selectedIds.length})
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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
