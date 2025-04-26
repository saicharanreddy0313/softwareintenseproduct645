import Search from '../../components/search/Search.js';
import CategoryCard from '../../components/CategoryCard/CategoryCard'; 
import '../../styles/Home.css';
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu';

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
];

const Home = () => {
  return (
    <div className="home-container">
      <SidebarMenu />
      <div className="main-content">
  <h1 className="home-welcome">Welcome to SIP Search</h1>
  <Search />
  <h2 className="categories-title">Product Categories</h2>
  <div className="categories-grid">
    {categories.map((category) => (
      <CategoryCard key={category.id} category={category} />
    ))}
  </div>
</div>

    </div>
  );
};

export default Home;
