import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { RekaLogo } from '../RekaLogo/RekaLogo';
import { Icon } from '@iconify/react';
import { frontend_routes } from '../../routes/frontend';
import { useNavigation } from '../../context/NavigationContext';

function getOffsetTop(element: HTMLElement | null): number {
    let offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent as HTMLElement | null;
    }
    return offsetTop;
}

type element = {
    inner: JSX.Element,
    action?: (e: React.MouseEvent) => void;
}

type NavbarProps = {
    className?: string;
    elements?: element[];
};

export function Navbar({ className = '', elements }: NavbarProps) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const spacerRef = React.useRef<HTMLDivElement | null>(null);
    const navbarRef = React.useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { setTargetSection } = useNavigation();

    const stickyHeight = getOffsetTop(spacerRef.current);
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };
    const [isSticky, setIsSticky] = useState(false);
    const handleScroll = useCallback(() => {
        setIsSticky(window.scrollY >= stickyHeight);
    }, [stickyHeight]);

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
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [dropdownOpen]);

    useEffect(() => {
        if (!isMobile) {
            setDropdownOpen(false);
        }
    }, [isMobile]);

    function scrollToSection(targetId: string) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function handleNavigation(targetId: string) {
        if (location.pathname !== frontend_routes.home) {
            setTargetSection(targetId);
            navigate(frontend_routes.home);
        } else {
            scrollToSection(targetId);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.spacer} ref={spacerRef}></div>
            <div
                className={`${styles.navbar} ${isSticky ? styles.sticky : ''} ${className}`}
                ref={navbarRef}
            >
                <div
                    className={styles.logo}
                    onClick={() => {
                        navigate(frontend_routes.home);
                    }}
                >
                    <RekaLogo svgWidth={200} />
                </div>
                <div className={`${styles.content} ${dropdownOpen ? styles.open : ''}`}>
                    {elements?.map((element, key) => {
                        const onClick = (e: React.MouseEvent<Element, MouseEvent>) => {
                            element.action?.(e);
                            if (isMobile) {
                                setDropdownOpen(false);
                            }
                            handleNavigation(element.inner.props['data-target']);
                        };
                        return (
                            <div className={styles.content_item} key={key} onClick={onClick}>
                                {element.inner}
                            </div>
                        );
                    })}
                </div>
                {isMobile && (
                    <div
                        className={styles.menu}
                        onClick={() => {
                            setDropdownOpen(!dropdownOpen);
                            navbarRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <Icon icon="eva:menu-2-outline" width="3rem" height="3rem" />
                    </div>
                )}
            </div>
        </div>
    );
}
