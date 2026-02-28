import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Properties', to: '/properties' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [location]);

    const isTransparent = isHome && !scrolled;

    const navBg = isTransparent
        ? 'bg-transparent'
        : isDark
            ? 'backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'backdrop-blur-xl shadow-lg';

    const navBgStyle = isTransparent
        ? {}
        : { background: 'var(--navbar-scrolled-bg)', borderBottom: '1px solid var(--border-color)' };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
            style={navBgStyle}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-18 py-4">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#A0822A] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                            <span className="text-white font-bold text-lg leading-none select-none">L</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white drop-shadow-sm">
                            {siteConfig.agencyName}
                        </span>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(({ label, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-all duration-200 relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-[#C9A84C] after:transition-all after:duration-300 hover:after:w-full
                  ${isActive ? 'text-[#C9A84C] after:w-full' : 'text-white hover:text-[#C9A84C]'}`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right side: Toggle + CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Artistic Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle"
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={isDark ? 'Light Mode' : 'Dark Mode'}
                        >
                            <span className="theme-toggle-thumb">
                                {isDark
                                    ? <Moon size={11} strokeWidth={2.5} />
                                    : <Sun size={11} strokeWidth={2.5} />
                                }
                            </span>
                        </button>

                        {/* Call CTA */}
                        <a
                            href={`tel:${siteConfig.phone}`}
                            className="flex items-center gap-2 bg-gradient-to-r from-[#C9A84C] to-[#A0822A] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]"
                        >
                            <Phone size={14} />
                            Call Us
                        </a>
                    </div>

                    {/* Mobile: toggle + hamburger */}
                    <div className="md:hidden flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle"
                            aria-label={isDark ? 'Light mode' : 'Dark mode'}
                        >
                            <span className="theme-toggle-thumb">
                                {isDark
                                    ? <Moon size={11} strokeWidth={2.5} />
                                    : <Sun size={11} strokeWidth={2.5} />
                                }
                            </span>
                        </button>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-lg text-white hover:text-[#C9A84C] transition-colors"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ background: 'var(--navbar-scrolled-bg)', borderTop: '1px solid var(--border-color)' }}
            >
                <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
                    {navLinks.map(({ label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `text-base font-medium py-2 border-b transition-colors ${isActive ? 'text-[#C9A84C]' : 'text-white hover:text-[#C9A84C]'}`
                            }
                            style={{ borderColor: 'var(--border-color)' }}
                        >
                            {label}
                        </NavLink>
                    ))}
                    <a
                        href={`tel:${siteConfig.phone}`}
                        className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[#C9A84C] to-[#A0822A] text-white px-5 py-3 rounded-full text-sm font-semibold"
                    >
                        <Phone size={14} />
                        {siteConfig.phone}
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
