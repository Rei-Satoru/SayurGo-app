import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import ProductRepository from '../repositories/productRepository';

export const useOrders = () => {
  // 👇 PERBAIKAN: Tambahkan <any[]> agar tidak error 'never'
  const [orders, setOrders] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await ProductRepository.getOrders();
      // Pastikan data berupa array, jika error/kosong jadikan []
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gagal ambil orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // useFocusEffect agar data refresh otomatis setiap kali masuk halaman ini
  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  return { orders, loading, refetch: fetchOrders };
};