import React from 'react';
import { useState, useEffect, useCallback} from 'react'
import styles from './Navbar.module.css';

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
    <div className={styles.wrapper}>
      <div className={styles.spacer} ref={spacerRef}></div>
      <div className={styles.navbar + ' ' + (isSticky ? styles.sticky : '') + ' ' + className}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.content + ' ' + (dropdownOpen ? styles.open : '')}>
        {
          elements?.map((element, key) => 
            <div className={styles.content_item} key={key}>
              {element}
            </div>
          )
        }
        </div>
        {isMobile && <div className={styles.menu} onClick={e => {
          setDropdownOpen(!dropdownOpen);
        }}></div>}
      </div>
    </div>
  );
}