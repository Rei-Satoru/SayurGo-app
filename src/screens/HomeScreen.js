import { useRouter } from 'expo-router';
import { useState } from 'react';
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
import styles from '../styles/homeStyles';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const { width } = Dimensions.get('window');
  const isSmall = width <= 420;
  const router = useRouter();

  const categories = [
    { id: 1, name: 'Sayur', icon: 'https://cdn-icons-png.flaticon.com/512/706/706164.png' },
    { id: 2, name: 'Buah', icon: 'https://cdn-icons-png.flaticon.com/512/415/415733.png' },
    { id: 4, name: 'Bumbu', icon: 'https://cdn-icons-png.flaticon.com/512/2747/2747737.png' },
  ];

  const products = [
    { id: 1, name: 'Bayam Segar', price: 'Rp 5.000', image: 'https://cdn-icons-png.flaticon.com/512/766/766336.png' },
    { id: 2, name: 'Tomat Merah', price: 'Rp 8.000', image: 'https://cdn-icons-png.flaticon.com/512/766/766330.png' },
    { id: 3, name: 'Beras Premium 5kg', price: 'Rp 70.000', image: 'https://cdn-icons-png.flaticon.com/512/2738/2738730.png' },
    { id: 4, name: 'Telur Ayam 1kg', price: 'Rp 25.000', image: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ===== Brand (top-left, above search) ===== */}
      <View style={styles.brandContainer}>
        <View style={styles.brandWrapper}>
          <Text style={styles.brandSayur}>Sayur.</Text>
          <Text style={styles.brandGo}>GO</Text>
        </View>
      </View>

      {/* ===== Header ===== */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>Belanja bahan segar hari ini yuk!</Text>
        </View>
        <Image
          source={require('../../assets/images/gambar1.jpg')}
          style={styles.avatar}
        />
      </View>

      {/* ===== Search Bar ===== */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari sayur, buah, atau sembako..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ===== Ojek Advertisement ===== */}
      <View style={styles.ojekAdContainer}>
        <View style={styles.ojekAdContent}>
          <Text style={styles.ojekAdTitle}>Segarnya sampai rumah, ongkirnya 10Km !!</Text>
          <TouchableOpacity style={styles.ojekAdButton}>
            <Text style={styles.ojekAdButtonText}>Belanja Sekarang →</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/images/ojek.png')}
          style={styles.ojekAdImage}
          resizeMode="contain"
        />
      </View>

      {/* ===== Banner ===== */}
      <View style={styles.banner}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-vector/organic-flat-vegetables-supermarket-illustration_23-2148932048.jpg',
          }}
          style={styles.bannerImage}
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
            <Image source={{ uri: item.image }} style={styles.productImage} />
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