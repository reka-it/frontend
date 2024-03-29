import React from 'react';
import { useState, useEffect } from 'react'
import './Navbar.css';

export function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Add a listener for window resize events
  useEffect(() => {
    // Add a listener for window resize events
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    
    // Clean up the listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='navbar'>
      <div className='logo'>Logo</div>
      <div className={'content' + (dropdownOpen ? ' open' : '')}>
        <div className='content-item'><div>elm1</div></div>
        <div className='content-item'><div>elm2</div></div>
        <div className='content-item'><div>elm3</div></div>
      </div>
      {isMobile && <div className='menu' onClick={e => {
        setDropdownOpen(!dropdownOpen);
      }}></div>}
    </div>
  );
}