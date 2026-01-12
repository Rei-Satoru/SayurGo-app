import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateCartItemApi } from '../features/entries/cartSlice';
import { AppDispatch } from '../store';

export const useUpdateCartItem = () => {
  const dispatch = useDispatch<AppDispatch>();

  const updateQuantity = useCallback((id: string, newQty: number) => {
    if (newQty < 1) return;
    dispatch(updateCartItemApi({ id, qty: newQty }));
  }, [dispatch]);

  const increaseQty = (id: string, currentQty: number) => updateQuantity(id, currentQty + 1);
  const decreaseQty = (id: string, currentQty: number) => updateQuantity(id, currentQty - 1);

  return { updateQuantity, increaseQty, decreaseQty };
};