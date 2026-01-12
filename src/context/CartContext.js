import React, { createContext, useState } from 'react';

export const CartContext = createContext();

<<<<<<< HEAD
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = (product) => {
  setCart((prev) => {
    const exist = prev.find((item) => item.id === product.id);

    if (exist) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    }

    return [...prev, { ...product, qty: 1 }];
  });

  // 🔥 POPUP ON
  setShowPopup(true);

  setTimeout(() => {
    setShowPopup(false);
  }, 1500);
};


  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const checkoutItems = (checkedIds) => {
  setCart((prev) =>
    prev.filter((item) => !checkedIds.includes(item.id))
  );
};


=======
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {

    const exist = cart.find(i => i.id === product.id);

    if (exist) {
      setCart(
        cart.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(i =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(i =>
      i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
    ));
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(i => i.id !== id));
  };

>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
  const clearAllCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
<<<<<<< HEAD
  value={{
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearAllCart,
    checkoutItems,
    showPopup, // ⬅️ PENTING
  }}
>

      {children}
    </CartContext.Provider>
  );
}
=======
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearAllCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
>>>>>>> 7a583ac31ac58968d7242c78c46c9229ddca3a84
