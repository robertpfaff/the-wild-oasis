import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItemCount } from '../features/cart/cartSlice';
import './Header.css';

function Header() {
  const cartItemCount = useSelector(selectCartItemCount);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          🏡 The Wild Oasis
        </Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/bookings">My Bookings</Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
