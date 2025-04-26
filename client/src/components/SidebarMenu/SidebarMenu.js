// components/SidebarMenu/SidebarMenu.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/SidebarMenu.css';
import { FaStar, FaVials, FaUser } from 'react-icons/fa';

const SidebarMenu = () => {
  return (
    <div className="sidebar">
      <Link to="/profile" className="sidebar-item">
        <FaUser style={{ marginRight: '8px' }} />
        Profile
      </Link>
      <Link to="/starred" className="sidebar-item">
        <FaStar style={{ marginRight: '8px' }} />
        Starred
      </Link>
      <Link to="/comparison" className="sidebar-item">
        <FaVials style={{ marginRight: '8px' }} />
        Comparison Tool
      </Link>
    </div>
  );
};

export default SidebarMenu;
