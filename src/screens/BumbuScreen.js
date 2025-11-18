import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../component/ProductCard';
import { BUMBU_DATA } from '../data/BumbuData';

export default function BumbuScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const filtered = BUMBU_DATA.filter((i) => i.nama.toLowerCase().includes(query.toLowerCase()));
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }} edges={['top', 'bottom']}>
      {/* In-screen header to ensure back is visible on all devices */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
          <Ionicons name="chevron-back" size={26} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#111', marginLeft: 6 }}>Bumbu</Text>
      </View>

      {/* Search bar to filter bumbu */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Cari bumbu masakan..."
          placeholderTextColor="#888"
          style={{ backgroundColor: '#E8F5E9', borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10 }}
        />
      </View>

      <FlatList
        contentContainerStyle={{ padding: 15 }}
        data={filtered}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </SafeAreaView>
  );
}
