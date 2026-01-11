import { useSelector } from 'react-redux';
import { selectAllBookings } from '../features/bookings/bookingsSlice';
import './Bookings.css';

function Bookings() {
  const bookings = useSelector(selectAllBookings);

  if (bookings.length === 0) {
    return (
      <div className="bookings container">
        <h1>My Bookings</h1>
        <p className="no-bookings">You don't have any bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="bookings container">
      <h1>My Bookings</h1>
      
      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-header">
              <h3>Booking #{booking.id}</h3>
              <span className={`status ${booking.status}`}>{booking.status}</span>
            </div>
            
            <p><strong>Booked on:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
            
            <div className="booking-items">
              {booking.items.map((item) => (
                <div key={item.cabin.id} className="booking-item">
                  <h4>{item.cabin.name}</h4>
                  <p>Check-in: {new Date(item.checkIn).toLocaleDateString()}</p>
                  <p>Check-out: {new Date(item.checkOut).toLocaleDateString()}</p>
                  <p>Guests: {item.guests}</p>
                  <p>Price: ${item.totalPrice}</p>
                </div>
              ))}
            </div>
            
            <div className="booking-total">
              <strong>Total: ${booking.totalAmount}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
