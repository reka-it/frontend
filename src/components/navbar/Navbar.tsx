import React from 'react';
import { useState, useEffect } from 'react'
import './Navbar.css';

type NavbarProps = {
  elements?: JSX.Element[];
};

function getOffsetTop(element: HTMLElement | null): number {
  let offsetTop = 0;
  while(element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent as HTMLElement | null;
  }
  return offsetTop;
}

export function Navbar({
  elements
}: NavbarProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const spacerRef = React.useRef<HTMLDivElement>(null);

  const [stickyHeight, setStickyHeight] = useState(0);
  // Set the stickyHeight to the top offset of the spacer element and add resize listener to update the stickyHeight
  useEffect(() => {
    const handleResize = () => {
      setStickyHeight(getOffsetTop(spacerRef.current));
      console.log(spacerRef.current);
    };
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  const [isSticky, setIsSticky] = useState(false);
  // Add a listener for window scroll events
  useEffect(() => {
    // Add a listener for window scroll events
    const handleScroll = () => {
      setIsSticky(window.scrollY >= stickyHeight);
      console.log(window.scrollY, stickyHeight);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [stickyHeight]);

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
    <div className='wrapper'>
      <div className='spacer' ref={spacerRef}></div>
      <div className={'navbar' + (isSticky ? ' sticky' : '')}>
        <div className='logo'>Logo</div>
        <div className={'content' + (dropdownOpen ? ' open' : '')}>
        {
          elements?.map((element, key) => 
            <div className='content-item' key={key}>
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