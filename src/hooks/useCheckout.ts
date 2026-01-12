import { useState } from 'react';
import ProductRepository from '../repositories/productRepository';
import { useDispatch } from 'react-redux';
// Jika mau menghapus keranjang setelah checkout, import actionnya (opsional)
// import { clearCartApi } from '../features/entries/cartSlice';

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const processCheckout = async (payload: any) => {
    setLoading(true);
    try {
      console.log("Mengirim Pesanan...", payload);
      
      // 1. Kirim Data ke API
      await ProductRepository.createTransaction(payload);
      
      // 2. (Opsional) Hapus keranjang lokal/API setelah sukses
      // await dispatch(clearCartApi()); 

      return true; // Berhasil
    } catch (error) {
      console.error("Error Checkout:", error);
      alert("Gagal memproses pesanan. Cek koneksi atau data.");
      return false; // Gagal
    } finally {
      setLoading(false);
    }
  };

  return { processCheckout, loading };
};