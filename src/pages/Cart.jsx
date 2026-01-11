import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal, removeFromCart } from '../features/cart/cartSlice';
import './Cart.css';

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (cabinId) => {
    dispatch(removeFromCart(cabinId));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      // TODO: Replace with inline message for better UX
      alert('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart container">
        <h1>Shopping Cart</h1>
        <p className="empty-cart">Your cart is empty</p>
        <button onClick={() => navigate('/')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart container">
      <h1>Shopping Cart</h1>
      
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.cabin.id} className="cart-item">
            <img src={item.cabin.image} alt={item.cabin.name} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.cabin.name}</h3>
              <p>Check-in: {new Date(item.checkIn).toLocaleDateString()}</p>
              <p>Check-out: {new Date(item.checkOut).toLocaleDateString()}</p>
              <p>Guests: {item.guests}</p>
              <p>Nights: {item.nights}</p>
              <p className="cart-item-price">Total: ${item.totalPrice}</p>
            </div>
            <button onClick={() => handleRemove(item.cabin.id)} className="remove-btn">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: ${totalAmount}</h2>
        <button onClick={handleCheckout} className="checkout-btn">
          Proceed to Checkout
        </button>
        <button onClick={() => navigate('/')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Cart;
