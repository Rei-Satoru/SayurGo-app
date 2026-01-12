import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ProductRepository from '../../repositories/productRepository';

// 👇 1. KITA BUAT DEFINISI TIPE DATANYA DULU
interface CartItem {
  id: string;
  quantity: number;
  qty?: number; // Opsional, jaga-jaga kalau field beda
  [key: string]: any; // Izinkan properti lain (seperti _produk, harga, dll)
}

interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// 👇 2. GUNAKAN TIPE DATA DI SINI
const initialState: CartState = {
  items: [],
  status: 'idle', 
  error: null,
};

// --- THUNKS (Tetap Sama) ---

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await ProductRepository.getCartItems();
  return Array.isArray(response) ? response : response.data || [];
});

export const addToCartApi = createAsyncThunk('cart/addToCart', async (item: any) => {
  await ProductRepository.addToCart(item.id, 1);
  return item; 
});

export const updateCartItemApi = createAsyncThunk(
  'cart/updateQty', 
  async ({id, qty}: {id: string, qty: number}) => {
    await ProductRepository.updateCartItem(id, qty);
    return { id, qty };
  }
);

export const removeFromCartApi = createAsyncThunk(
  'cart/remove', 
  async (id: string) => {
    await ProductRepository.deleteCartItem(id);
    return id; 
  }
);

// --- SLICE ---

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error fetching cart';
      })

      // ADD
      .addCase(addToCartApi.fulfilled, (state) => {
        state.status = 'idle'; 
      })

      // UPDATE (Sekarang TypeScript sudah paham tipe datanya, merahnya hilang)
      .addCase(updateCartItemApi.fulfilled, (state, action) => {
        const { id, qty } = action.payload;
        // TypeScript sekarang tahu item punya properti .id
        const existingItem = state.items.find((item) => item.id === id);
        
        if (existingItem) {
           existingItem.quantity = qty;
           existingItem.qty = qty; 
        }
      })

      // REMOVE
      .addCase(removeFromCartApi.fulfilled, (state, action) => {
        // TypeScript sekarang tahu item punya properti .id
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;