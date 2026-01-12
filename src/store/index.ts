import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartReducer from '../features/entries/cartSlice'; // Import yang baru

const rootReducer = combineReducers({
  cart: cartReducer, // Masukkan ke reducer utama
  // favorites: favoritesReducer, (jika ada)
  // preferences: preferencesReducer, (jika ada)
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart'], // Pastikan cart disimpan
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;