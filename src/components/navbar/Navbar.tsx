import React from 'react';
import { useState, useEffect, useCallback} from 'react'
import './Navbar.css';

type NavbarProps = {
  className?: string;
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
  className = '',
  elements
}: NavbarProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const spacerRef = React.useRef<HTMLDivElement>(null);

  const [stickyHeight, setStickyHeight] = useState(0);
  const handleResize = () => {
    setStickyHeight(getOffsetTop(spacerRef.current));
    setIsMobile(window.innerWidth <= 768);
  };
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = useCallback(() => {
    setIsSticky(window.scrollY >= stickyHeight);
  }, [stickyHeight]);

  // Init
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };

  }, [handleScroll]);

  return (
    <div className='wrapper'>
      <div className='spacer' ref={spacerRef}></div>
      <div className={'navbar' + (isSticky ? ' sticky' : '') + ' ' + className}>
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