import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function CartPage() {
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const nav = useNavigate();

  const handleCheckout = async () => {
    if (!currentUser) {
      nav('/login');
      return;
    }
    await addDoc(collection(db, 'bookings'), {
      userId: currentUser.uid,
      items: cartItems.map(({id,title,price,quantity})=>({id,title,price,quantity})),
      total: totalPrice,
      createdAt: Timestamp.now()
    });
    clearCart();
    nav('/success');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container my-4">
        <h1>Your Cart</h1>
        <p className="lead">Your cart is empty.</p>
        <Link to="/" className="btn btn-outline-primary">Browse Events</Link>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1 className="mb-4">Your Cart</h1>
      <div className="row">
        {cartItems.map(item => (
          <div className="col-md-6 mb-3" key={item.id}>
            <div className="card h-100">
              <div className="row g-0 h-100">
                <div className="col-4">
                  <img
                    src={item.thumbnail}
                    className="img-fluid rounded-start h-100"
                    alt={item.title}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="col-8">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-primary">${item.price} × {item.quantity}</p>

                    <div className="btn-group mb-3" role="group">
                      <button
                        className="btn btn-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >-</button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </div>

                    <button
                      className="btn btn-danger mt-auto"
                      onClick={() => removeFromCart(item.id)}
                    >Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
        <button className="btn btn-success btn-lg" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
