// src/pages/CartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebaseConfig';                               // :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function CartPage() {
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    // 1. Redirect to login if not authenticated
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      // 2. Write booking to Firestore
      await addDoc(collection(db, 'bookings'), {
        userId: currentUser.uid,
        items: cartItems.map(({ id, title, price, quantity }) => ({
          id, title, price, quantity
        })),
        total: totalPrice,
        createdAt: Timestamp.now()
      });

      // 3. Clear cart and navigate to success
      clearCart();
      navigate('/success');
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Sorry, something went wrong. Please try again.');
    }
  };

  if (cartItems.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div>
      <h1>Your Cart</h1>

      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <h3>{item.title}</h3>
          <p>${item.price} × {item.quantity}</p>
          <div>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}

      <h2>Total: ${totalPrice.toFixed(2)}</h2>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}
