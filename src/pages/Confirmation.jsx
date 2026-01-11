import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentBooking } from '../features/bookings/bookingsSlice';
import './Confirmation.css';

function Confirmation() {
  const booking = useSelector(selectCurrentBooking);
  const navigate = useNavigate();

  if (!booking) {
    return (
      <div className="confirmation container">
        <h1>No Booking Found</h1>
        <button onClick={() => navigate('/')} className="home-btn">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="confirmation container">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h1>Booking Confirmed!</h1>
        <p className="confirmation-message">
          Thank you for your booking. A confirmation email has been sent to {booking.customerInfo.email}
        </p>
        
        <div className="booking-details">
          <h2>Booking Details</h2>
          <p><strong>Booking ID:</strong> {booking.id}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          
          <h3>Cabins Booked:</h3>
          {booking.items.map((item) => (
            <div key={item.cabin.id} className="booked-cabin">
              <p><strong>{item.cabin.name}</strong></p>
              <p>Check-in: {new Date(item.checkIn).toLocaleDateString()}</p>
              <p>Check-out: {new Date(item.checkOut).toLocaleDateString()}</p>
              <p>Guests: {item.guests}</p>
              <p>Total: ${item.totalPrice}</p>
            </div>
          ))}
          
          <div className="total-paid">
            <h3>Total Paid: ${booking.totalAmount}</h3>
          </div>
        </div>

        <div className="confirmation-actions">
          <button onClick={() => navigate('/bookings')} className="view-bookings-btn">
            View My Bookings
          </button>
          <button onClick={() => navigate('/')} className="home-btn">
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
