import { useState } from 'react';
import { events } from '../data/events';
import { Link } from 'react-router-dom';

export default function HomePage(){
  const [query,setQuery] = useState('');
  const [sortKey,setSortKey] = useState('');
  let list = events.filter(e => e.title.toLowerCase().includes(query.toLowerCase()));
  if(sortKey==='date') list.sort((a,b)=>new Date(a.date)-new Date(b.date));
  if(sortKey==='price') list.sort((a,b)=>a.price-b.price);

  return (
    <>
      <h1>Events</h1>
      <div style={{margin:'1rem 0'}}>
        <input placeholder="Search..." value={query} onChange={e=>setQuery(e.target.value)} />
        <select value={sortKey} onChange={e=>setSortKey(e.target.value)} style={{marginLeft:'1rem'}}>
          <option value="">Sort by</option>
          <option value="date">Date</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="event-grid">
        {list.map(event=> (
          <div className="event-card" key={event.id}>
            <img src={event.thumbnail} alt={event.title} />
            <div className="event-card-content">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>${event.price}</p>
              <Link to={`/event/${event.id}`}><button>Details</button></Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}