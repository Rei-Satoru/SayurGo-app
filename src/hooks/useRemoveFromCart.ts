import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCartApi } from '../features/entries/cartSlice';
import { AppDispatch } from '../store';

export const useRemoveFromCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const removeCartItem = useCallback((id: string) => {
    dispatch(removeFromCartApi(id));
  }, [dispatch]);

  return { removeCartItem };
};