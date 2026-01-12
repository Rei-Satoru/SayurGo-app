// File: src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import ProductRepository from '../repositories/productRepository';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Panggil Repository (Langkah 2)
      const data = await ProductRepository.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Gagal ambil produk:", error);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, refetch: fetchData };
};