import { useSelector } from 'react-redux';
import { selectFilteredCabins } from '../features/cabins/cabinsSlice';
import CabinCard from './CabinCard';
import './CabinList.css';

function CabinList() {
  const cabins = useSelector(selectFilteredCabins);

  return (
    <div className="cabin-list">
      <h2>Available Cabins</h2>
      <div className="cabin-grid">
        {cabins.map((cabin) => (
          <CabinCard key={cabin.id} cabin={cabin} />
        ))}
      </div>
    </div>
  );
}

export default CabinList;
