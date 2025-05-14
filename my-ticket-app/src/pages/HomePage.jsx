import React, { useState } from 'react';
import { events } from '../data/events';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('');

  let filtered = events.filter(e =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );
  if (sortKey === 'date')
    filtered.sort((a,b) => new Date(a.date) - new Date(b.date));
  if (sortKey === 'price')
    filtered.sort((a,b) => a.price - b.price);

  return (
    <div className="container my-4">
      <h1 className="mb-4">Events</h1>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search events..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={sortKey}
            onChange={e => setSortKey(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="date">Date</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filtered.map(evt => (
          <div className="col-lg-4 mb-4" key={evt.id}>
            <div className="card h-100">
              <img src={evt.thumbnail} className="card-img-top" alt={evt.title}/>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{evt.title}</h5>
                <p className="card-text">{evt.date}</p>
                <p className="card-text fw-bold">${evt.price}</p>
                <Link to={`/event/${evt.id}`} className="btn btn-primary mt-auto">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
