import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebaseConfig';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      if (!currentUser) return;
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetchBookings();
  }, [currentUser]);

  return (
    <div className="container my-4">
      <div className="card p-4 mx-auto" style={{ maxWidth: '700px' }}>
        <h1>Profile</h1>
        {currentUser ? (
          <>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <button className="btn btn-outline-danger mb-4" onClick={logout}>
              Logout
            </button>

            <h2>Booking History</h2>
            {bookings.length === 0 ? (
              <p>No bookings yet.</p>
            ) : (
              bookings.map(b => (
                <div className="card mb-3" key={b.id}>
                  <div className="card-body">
                    <h5 className="card-title">Booking ID: {b.id}</h5>
                    <p className="card-text"><strong>Total:</strong> ${b.total.toFixed(2)}</p>
                    <p className="card-text">
                      <strong>Date:</strong> {new Date(b.createdAt.toDate()).toLocaleString()}
                    </p>
                    <ul>
                      {b.items.map(i => (
                        <li key={i.id}>{i.title} × {i.quantity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          <p>Please <Link to="/login">log in</Link> to view your profile.</p>
        )}
      </div>
    </div>
  );
}
