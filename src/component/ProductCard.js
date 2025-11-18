import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { CartContext } from '../context/CartContext';
import styles from '../styles/ProductCardStyles';

export default function ProductCard({ item, onAddToCart }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(item);
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <Text style={styles.category}>{item.jenis}</Text>
      <Text style={styles.name}>{item.nama}</Text>
      <Text style={styles.weight}>{item.berat}</Text>

      <Text style={styles.price}>Rp{item.harga.toLocaleString()}</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.btnText}>Tambah</Text>
      </TouchableOpacity>
    </View>
  );
}
