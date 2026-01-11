import CabinList from '../components/CabinList';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to The Wild Oasis</h1>
          <p>Discover your perfect cabin retreat in nature</p>
        </div>
      </section>
      <div className="container">
        <CabinList />
      </div>
    </div>
  );
}

export default Home;
