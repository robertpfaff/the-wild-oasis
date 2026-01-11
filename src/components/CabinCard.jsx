import { Link } from 'react-router-dom';
import './CabinCard.css';

function CabinCard({ cabin }) {
  return (
    <div className="cabin-card">
      <img src={cabin.image} alt={cabin.name} className="cabin-image" />
      <div className="cabin-info">
        <h3>{cabin.name}</h3>
        <p className="cabin-description">{cabin.description}</p>
        <div className="cabin-details">
          <span className="cabin-price">${cabin.price}/night</span>
          <span className="cabin-capacity">Up to {cabin.maxCapacity} guests</span>
        </div>
        <div className="cabin-amenities">
          {cabin.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
        </div>
        <Link to={`/cabins/${cabin.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default CabinCard;
