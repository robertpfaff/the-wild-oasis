import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal, clearCart } from '../features/cart/cartSlice';
import { createBooking } from '../features/bookings/bookingsSlice';
import './Checkout.css';

function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.cardNumber) {
      // TODO: Replace with inline form validation for better UX
      alert('Please fill in all fields');
      return;
    }

    // Create booking
    const bookingData = {
      customerInfo: formData,
      items: cartItems,
      totalAmount,
    };

    dispatch(createBooking(bookingData));
    dispatch(clearCart());
    navigate('/confirmation');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout container">
        <h1>Checkout</h1>
        <p>Your cart is empty</p>
        <button onClick={() => navigate('/')} className="back-btn">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout container">
      <h1>Checkout</h1>
      
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Customer Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Complete Booking
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.cabin.id} className="summary-item">
              <p><strong>{item.cabin.name}</strong></p>
              <p>{item.nights} nights × ${item.cabin.price}/night</p>
              <p className="item-total">${item.totalPrice}</p>
            </div>
          ))}
          <div className="summary-total">
            <h3>Total: ${totalAmount}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
