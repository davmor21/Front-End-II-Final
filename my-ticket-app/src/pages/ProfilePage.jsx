import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export default function ProfilePage(){
  const { currentUser, logout } = useAuth();
  const [bookings,setBookings] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      if(currentUser) {
        const q = query(collection(db,'bookings'), where('userId','==',currentUser.uid), orderBy('createdAt','desc'));
        const snap = await getDocs(q);
        setBookings(snap.docs.map(d=>({id:d.id,...d.data()})));
      }
    }
    fetchData();
  },[currentUser]);

  if(!currentUser) return <p>Please log in to view your profile.</p>;
  return (
    <>
      <h1>Profile</h1>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <button onClick={logout}>Logout</button>
      <div className="profile-section">
        <h2>Booking History</h2>
        {bookings.length===0 ? <p>No bookings yet.</p> : bookings.map(b=>(
          <div className="booking-card" key={b.id}>
            <p><strong>ID:</strong> {b.id}</p>
            <p><strong>Total:</strong> ${b.total.toFixed(2)}</p>
            <p><strong>Date:</strong> {new Date(b.createdAt.toDate()).toLocaleString()}</p>
            <ul>{b.items.map(i=><li key={i.id}>{i.title} x {i.quantity}</li>)}</ul>
          </div>
        ))}
      </div>
    </>
  );
}