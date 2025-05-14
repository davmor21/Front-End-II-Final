import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || []; } catch { return []; }
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => {
    setTotalPrice(cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id===item.id ? {...i, quantity: i.quantity+1} : i);
      return [...prev, {...item, quantity:1}];
    });
  };
  const updateQuantity = (id, qty) => {
    setCartItems(prev => prev.map(i=> i.id===id ? {...i,quantity:qty} : i).filter(i=>i.quantity>0));
  };
  const removeFromCart = (id) => setCartItems(prev => prev.filter(i=>i.id!==id));
  const clearCart = () => setCartItems([]);

  return <CartContext.Provider value={{cartItems, totalPrice, addToCart, updateQuantity, removeFromCart, clearCart}}>{children}</CartContext.Provider>;
}
