import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartApi, updateCartItemApi } from '../features/entries/cartSlice';
import { AppDispatch, RootState } from '../store'; 

export const useAddToCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPopup, setShowPopup] = useState(false);

  // Ambil data keranjang dari Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const addToCart = useCallback(async (product: any) => {
    try {
      // 1. CARI ITEM (LOGIC ANTI DUPLIKAT DIPERKUAT)
      const existingItem = cartItems.find((item: any) => {
         // Cek ID Produk di dalam keranjang (bisa di root atau di dalam _produk)
         const cartProductId = item.product_id || (item._produk && item._produk.id) || item.id;
         
         // Bandingkan dengan Product ID yang mau ditambah (Pakai String biar aman)
         return String(cartProductId) === String(product.id);
      });

      // Debugging: Cek di console apakah item ditemukan
      if (existingItem) {
        console.log("Item ditemukan, update quantity:", existingItem.id);
        // 2a. JIKA ADA -> UPDATE QTY
        const currentQty = Number(existingItem.qty || existingItem.quantity || 1);
        await dispatch(updateCartItemApi({ 
            id: existingItem.id, // ID Transaksi Keranjang
            qty: currentQty + 1 
        }));
      } else {
        console.log("Item baru, tambahkan:", product.id);
        // 2b. JIKA BELUM ADA -> TAMBAH BARU
        await dispatch(addToCartApi(product));
      }
      
      // Munculkan Popup
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1500);

    } catch (error) {
      console.error("Gagal tambah keranjang:", error);
    }
  }, [dispatch, cartItems]);

  return { addToCart, showPopup };
};