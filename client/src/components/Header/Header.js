import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import '../../styles/Header.css'; // Create this CSS file

const Header = () => {
  const { user, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="header-container">
      <div className="user-icon-container">
        <div className="user-icon" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <FaUserCircle size={32} />
          {isDropdownOpen && (
            <div className="profile-dropdown">
              <Link to="/profile" className="dropdown-item">
                View Profile
              </Link>
              <button onClick={signOut} className="dropdown-item">
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="user-email">
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;