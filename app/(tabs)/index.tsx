import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../src/styles/homeStyles';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const { width } = Dimensions.get('window');
  const isSmall = width <= 380;
  const router = useRouter();

  const categories = [
    { id: 1, name: 'Sayur', icon: 'https://cdn-icons-png.flaticon.com/512/706/706164.png' },
    { id: 2, name: 'Buah', icon: 'https://cdn-icons-png.flaticon.com/512/415/415733.png' },
    { id: 4, name: 'Bumbu', icon: 'https://cdn-icons-png.flaticon.com/512/2747/2747737.png' },
  ];

  const products = [
    { id: 1, name: 'Brokoli', price: 'Rp 5.000', image: require('../../assets/images/brokoli.png') },
    { id: 2, name: 'Tomat Merah', price: 'Rp 8.000', image: require('../../assets/images/Tomat.png') },
    { id: 3, name: 'Daging Halal', price: 'Rp 100.000', image: require('../../assets/images/sapi.png') },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ===== Top Bar: brand left, cart icon right ===== */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <View style={styles.brandWrapper}>
            <Text style={[styles.brandSayur, isSmall && styles.brandSayurSmall]}>Sayur.</Text>
            <Text style={[styles.brandGo, isSmall && styles.brandGoSmall]}>GO</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push('/cart')}
          accessible
          accessibilityLabel="Keranjang"
        >
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      {/* ===== Search Bar (centered under top bar) ===== */}
      <View style={[styles.searchBox, styles.searchBoxCenter, isSmall && styles.searchBoxCenterSmall]}>
        <TextInput
          style={[styles.searchInput, isSmall && styles.searchInputSmall]}
          placeholder="Cari produk disini..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ===== Hero: centered full-width pedagang image ===== */}
      <View style={styles.heroImageWrap}>
        <Text style={[styles.heroCaption, isSmall && styles.heroCaptionSmall]}>
          <Text style={styles.heroCaptionHighlight}>Segar</Text>{' '}
          Setiap Hari di Meja{' '}
          <Text style={styles.heroCaptionHighlight}>Anda</Text>
        </Text>
        <Image
          source={require('../../assets/images/pedagang.png')}
          style={[styles.heroImageFull, isSmall && styles.heroImageFullSmall]}
          resizeMode="cover"
        />
      </View>

      {/* ===== Category ===== */}
      <Text style={styles.sectionTitle}>Kategori</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => {
              console.warn('Category pressed:', item.name);
              const key = item.name.toLowerCase();
              if (key === 'sayur') router.push('/sayur');
              else if (key === 'buah') router.push('/buah');
              else if (key === 'bumbu') router.push('/bumbu');
            }}
          >
            <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />

      {/* ===== Product Section ===== */}
      <Text style={styles.sectionTitle}>Produk Unggulan</Text>
      <FlatList
        horizontal
        data={products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard}>
            <Image 
              source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
              style={styles.productImage} 
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />

      {/* ===== Promo (Buah Segar) ===== */}
      <View style={[styles.promo, isSmall && styles.promoSmall]}>
        <View style={styles.promoBadge}>
          <Text style={styles.promoBadgeText}>Diskon 15%</Text>
        </View>
        <View style={[styles.promoTextWrap, isSmall && styles.promoTextWrapSmall]}>
          <Text style={[styles.promoTitle, isSmall && styles.promoTitleSmall]}>Buah Segar, Berkualitas Tinggi</Text>
          <Text style={[styles.promoDesc, isSmall && styles.promoDescSmall]}>Dapatkan buah berkualitas, tinggi vitamin dari tangan pertama.</Text>
        </View>
        <View style={[styles.promoImageContainer, isSmall && styles.promoImageContainerSmall]}>
          <Image source={require('../../assets/images/buahpot.png')} style={[styles.promoImage, isSmall && styles.promoImageSmall]} resizeMode="contain" />
        </View>
      </View>
    </ScrollView>
  );
}