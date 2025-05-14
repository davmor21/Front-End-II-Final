import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
export default function Navbar(){
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <div>
        <NavLink to="/">Events</NavLink>
        <NavLink to="/cart">Cart({cartItems.length})</NavLink>
        {currentUser ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}