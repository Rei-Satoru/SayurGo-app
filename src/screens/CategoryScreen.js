import { useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import ProductCard from '../component/ProductCard';
import { CartContext } from '../context/CartContext';
import colors from '../styles/colors';

export default function CategoryScreen() {
  const route = useRoute();
  const { products = [], category = '' } = route.params || {};
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <ProductCard item={item} onAddToCart={() => addToCart(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

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
