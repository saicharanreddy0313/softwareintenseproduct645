import { useAuth } from '../../contexts/AuthContext';
import Search from '../../components/search/Search.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import CategoryCard from '../../components/CategoryCard/CategoryCard'; 
import '../../styles/Home.css';
import Header from '../../components/Header/Header';

const categories = [
  {
    id: 1,
    name: 'Cars',
    description: 'Automotive Sector Details',
    imageUrl: '/cars-category.jpg'
  },
  {
    id: 2,
    name: 'Wearables',
    description: 'Biometric trackers and augmented reality wearables',
    imageUrl: '/wearables-category.jpg'
  },
  {
    id: 3,
    name: 'Apparel',
    description: 'IoT-enabled clothing with health monitoring',
    imageUrl: '/apparel-category.jpg'
  }
  // Removed Home & Office category
];

const Home = () => {
  const { user, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="home-container">
      <Header /> {/* Add Header here */}
      <div className="user-icon-container">
        <div className="user-icon" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <FaUserCircle size={32} />
          {/* Dropdown Menu */}
          <div className="profile-dropdown">
            <Link to="/profile" className="dropdown-item">
              View Profile
            </Link>
            <button onClick={signOut} className="dropdown-item">
              Logout
            </button>
          </div>
        </div>
        <div className="user-email">
          <p>{user?.email}</p>
        </div>
      </div>

      <Search />
      <h2 className="categories-title">Product Categories</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Home;