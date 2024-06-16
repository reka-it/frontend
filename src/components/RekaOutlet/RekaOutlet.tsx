import { Navbar } from '../navbar';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';

export function RekaOutlet() {

    const navbarElements = [
        {
            inner: <div>Program</div>,
            action: (e: { preventDefault: () => void; }) => {
                e.preventDefault();
                document.getElementById('reka-2024-program')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            },
        },
        {
            inner: <div>Kart</div>,
            action: (e: { preventDefault: () => void; }) => {
                e.preventDefault();
                document.getElementById('reka-2024-map')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            },
        },
        {
            inner: <div>Hype!</div>,
            action: (e: { preventDefault: () => void; }) => {
                e.preventDefault();
                document.getElementById('reka-24-archive')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            },
        },
    ];

    return (
        <>
            <Navbar elements={navbarElements} />
                <Outlet />
            <Footer />
        </>
    );
}
