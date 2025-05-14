import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '../data/events';
import { useCart } from '../contexts/CartContext';

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const event = events.find(e => e.id === eventId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (!event) return <div className="container my-4"><h2>Event not found</h2></div>;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(event);
    navigate('/cart');
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6 mb-3">
          <img src={event.thumbnail} className="img-fluid rounded" alt={event.title} />
        </div>
        <div className="col-md-6">
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Price:</strong> <span className="text-primary">${event.price}</span></p>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control w-25"
              min="1"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
            />
          </div>
          <button className="btn btn-success" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}