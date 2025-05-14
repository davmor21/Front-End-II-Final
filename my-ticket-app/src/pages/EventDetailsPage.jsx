import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '../data/events';
import { useCart } from '../contexts/CartContext';

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const evt = events.find(e => e.id === eventId);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const nav = useNavigate();

  if (!evt) {
    return (
      <div className="container my-4">
        <h2>Event not found</h2>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(evt);
    nav('/cart');
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6 mb-3">
          <img src={evt.thumbnail} className="img-fluid rounded" alt={evt.title}/>
        </div>
        <div className="col-md-6">
          <h2>{evt.title}</h2>
          <p>{evt.description}</p>
          <p><strong>Date:</strong> {evt.date}</p>
          <p><strong>Location:</strong> {evt.location}</p>
          <p><strong>Price:</strong> <span className="fw-bold">${evt.price}</span></p>

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control w-25"
              min="1"
              value={qty}
              onChange={e => setQty(+e.target.value)}
            />
          </div>

          <button className="btn btn-success" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
