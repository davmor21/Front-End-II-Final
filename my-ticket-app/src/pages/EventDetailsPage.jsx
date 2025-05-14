import { useParams, useNavigate } from 'react-router-dom';
import { events } from '../data/events';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

export default function EventDetailsPage(){
  const { eventId } = useParams();
  const event = events.find(e=>e.id===eventId);
  const { addToCart } = useCart();
  const [quantity,setQuantity] = useState(1);
  const navigate = useNavigate();
  if(!event) return <div>Event not found</div>;

  const handleAdd = ()=>{
    for(let i=0;i<quantity;i++) addToCart(event);
    navigate('/cart');
  };

  return (
    <div className="event-details">
      <img src={event.thumbnail} alt={event.title} />
      <div className="event-info">
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> ${event.price}</p>
        <div style={{margin:'1rem 0'}}>
          <label>Qty:
            <input type="number" min="1" value={quantity} onChange={e=>setQuantity(Number(e.target.value))} style={{width:'3rem',marginLeft:'0.5rem'}}/>
          </label>
        </div>
        <button onClick={handleAdd}>Add to Cart</button>
      </div>
    </div>
  );
}
