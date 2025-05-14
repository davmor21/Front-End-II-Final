import { Link } from 'react-router-dom';
export default function SuccessPage(){
  return (
    <div className="success-page">
      <h1>Booking Confirmed!</h1>
      <p>Your tickets have been booked successfully.</p>
      <Link to="/">Back to Events</Link>
    </div>
  );
}