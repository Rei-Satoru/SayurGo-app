<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import styles from "../../src/styles/Category";
import ProductCard from "../component/ProductCard";
import { CartContext } from "@/src/context/CartContext";
=======
import { useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../component/ProductCard';
import { CartContext } from '../context/CartContext';
import colors from '../styles/colors';
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84

export default function CategoryScreen() {
  const route = useRoute();
  const { products, category } = route.params || {};
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/cart")}
          style={styles.headerIcon}
        >
          <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TextInput
          placeholder="Cari produk disini..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
        <Text style={styles.title}>{category}</Text>
      </View>

      {/* LIST PRODUK */}
=======
      <Text style={styles.title}>{category}</Text>
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
<<<<<<< HEAD
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
=======
        renderItem={({ item }) => (
          <ProductCard item={item} onAddToCart={handleAddToCart} />
        )}
        contentContainerStyle={styles.listContent}
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
      />
    </View>
  );
}
<<<<<<< HEAD
=======

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 15,
    marginBottom: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
});
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
