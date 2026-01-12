// Sesuaikan dengan screenshot Xano terakhir
export interface XanoImage {
  url: string;
}

export interface Product {
  id: string; // UUID di Xano adalah string
  created_at: number;
  nama_produk: string;
  kategori: string;
  harga: number;
  berat: number;
  satuan: string;
  deskripsi?: string;
  foto_produk?: XanoImage;
  rating?: string;
}

// Tipe data untuk Keranjang (Inheritance dari Product)
export interface CartItem extends Product {
  qty: number;
}