import React from 'react';
import { Link } from 'react-router-dom';

export default function SuccessPage() {
  return (
    <div className="container my-5 text-center">
      <h1 className="display-4 mb-3">Booking Confirmed!</h1>
      <p className="lead mb-4">Your tickets have been booked successfully.</p>
      <Link to="/" className="btn btn-primary btn-lg">Back to Events</Link>
    </div>
  );
}
