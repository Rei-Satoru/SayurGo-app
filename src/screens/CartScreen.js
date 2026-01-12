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
