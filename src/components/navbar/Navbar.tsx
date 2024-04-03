import React from 'react';
import { useState, useEffect, useCallback} from 'react'
import styles from './Navbar.module.css';

type element = {
  inner: JSX.Element;
  action?: (e: React.MouseEvent) => void;
}

type NavbarProps = {
  className?: string;
  elements?: element[];
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
  const navbarRef = React.useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (dropdownOpen) {
      // Disable scrolling when the dropdown is open
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling when the dropdown is closed
      document.body.style.overflow = 'auto';
    }
  
    // Clean up function to reset the overflow property when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [dropdownOpen]);

  useEffect(() => {
    if (!isMobile) {
      setDropdownOpen(false);
    }
  }, [isMobile]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.spacer} ref={spacerRef}></div>
      <div className={styles.navbar + ' ' + (isSticky ? styles.sticky : '') + ' ' + className} ref={navbarRef}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.content + ' ' + (dropdownOpen ? styles.open : '')}>
        {
          elements?.map((element, key) => {
            const onClick = (e: React.MouseEvent) => {
              element.action?.(e);
              if (isMobile) {
                setDropdownOpen(false);
              }
            }
            return <div className={styles.content_item} key={key} onClick={onClick}>
              {element.inner}
            </div>
          })
        }
        </div>
        {isMobile && <div className={styles.menu} onClick={e => {
          setDropdownOpen(!dropdownOpen);
          navbarRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}></div>}
      </div>
    </div>
  );
}