import React from 'react';
import { useState, useEffect } from 'react'
import './Navbar.css';

type NavbarProps = {
  elements?: JSX.Element[];
};

export function Navbar({
  elements
}: NavbarProps) {
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
    <div>
      <div className='spacer'></div>
      <div className='navbar'>
        <div className='logo'>Logo</div>
        <div className={'content' + (dropdownOpen ? ' open' : '')}>
        {
          elements?.map((element) => 
            <div className='content-item'>
              {element}
            </div>
          )
        }
        </div>
        {isMobile && <div className='menu' onClick={e => {
          setDropdownOpen(!dropdownOpen);
        }}></div>}
      </div>
    </div>
  );
}