import { apiClient } from "../api/apiClient";

const ProductRepository = {
  // 1. AMBIL SEMUA PRODUK
  getAllProducts: async () => {
    const res = await apiClient.get("/produk");
    return res.data;
  },

  // 2. AMBIL ISI KERANJANG
  getCartItems: async () => {
    const res = await apiClient.get("/keranjang");
    return res.data;
  },

  // 3. AMBIL RIWAYAT PESANAN (GET)
  getOrders: async () => {
    try {
      // ⚠️ PENTING: Pastikan di Xano endpoint GET /transaksi sudah ada Addon:
      // Table: transaksi -> Addon: transaksi_items -> Addon: produk
      const response = await apiClient.get('/transaksi');
      return response.data;
    } catch (error) {
      console.error("Gagal ambil riwayat:", error);
      return [];
    }
  },

  // 4. TAMBAH KE KERANJANG (POST)
  // Ubah tipe productId jadi number | string agar fleksibel
  addToCart: async (productId: number | string, quantity: number = 1) => {
    const res = await apiClient.post("/keranjang", {
      product_id: productId,
      quantity: quantity,
    });
    return res.data;
  },

  // 5. UPDATE QUANTITY (PATCH)
  updateCartItem: async (cartId: string, quantity: number) => {
    const res = await apiClient.patch(`/keranjang/${cartId}`, {
      quantity: quantity
    });
    return res.data;
  },

  // 6. HAPUS ITEM (DELETE)
  deleteCartItem: async (cartId: string) => {
    const res = await apiClient.delete(`/keranjang/${cartId}`);
    return res.data;
  },

  // 7. BUAT TRANSAKSI / CHECKOUT (POST)
  createTransaction: async (payload: any) => {
    try {
      // Mengirim data: user_id, total_harga, items, dll.
      const response = await apiClient.post('/transaksi', payload);
      return response.data;
    } catch (error) {
      console.error("Gagal membuat pesanan:", error);
      throw error;
    }
  }
};

export default ProductRepository;