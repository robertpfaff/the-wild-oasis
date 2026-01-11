import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { selectCabinById } from '../features/cabins/cabinsSlice';
import { addToCart } from '../features/cart/cartSlice';
import './CabinDetail.css';

function CabinDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cabin = useSelector((state) => selectCabinById(state, Number(id)));
  
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  if (!cabin) {
    return <div className="container"><p>Cabin not found</p></div>;
  }

  const handleAddToCart = () => {
    if (!checkIn || !checkOut) {
      // TODO: Replace with inline form validation for better UX
      alert('Please select check-in and check-out dates');
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      // TODO: Replace with inline form validation for better UX
      alert('Check-out date must be after check-in date');
      return;
    }

    dispatch(addToCart({ cabin, checkIn, checkOut, guests }));
    navigate('/cart');
  };

  return (
    <div className="cabin-detail container">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      
      <div className="detail-content">
        <img src={cabin.image} alt={cabin.name} className="detail-image" />
        
        <div className="detail-info">
          <h1>{cabin.name}</h1>
          <p className="detail-description">{cabin.description}</p>
          
          <div className="detail-specs">
            <div className="spec">
              <strong>Price:</strong> ${cabin.price}/night
            </div>
            <div className="spec">
              <strong>Max Capacity:</strong> {cabin.maxCapacity} guests
            </div>
          </div>

          <div className="amenities-section">
            <h3>Amenities</h3>
            <ul className="amenities-list">
              {cabin.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>

          <div className="booking-form">
            <h3>Book Your Stay</h3>
            <div className="form-group">
              <label htmlFor="checkIn">Check-in Date:</label>
              <input
                type="date"
                id="checkIn"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="checkOut">Check-out Date:</label>
              <input
                type="date"
                id="checkOut"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="guests">Number of Guests:</label>
              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                min="1"
                max={cabin.maxCapacity}
              />
            </div>

            <button onClick={handleAddToCart} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CabinDetail;
