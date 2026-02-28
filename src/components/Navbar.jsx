import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

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

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [location]);

    const navBg = isHome && !scrolled
        ? 'bg-transparent'
        : 'bg-[#0F1E3C]/95 backdrop-blur-sm shadow-lg';

    const textColor = isHome && !scrolled ? 'text-white' : 'text-white';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-18 py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-[#C9A84C] flex items-center justify-center">
                            <span className="text-white font-bold text-lg leading-none">L</span>
                        </div>
                        <span className={`font-bold text-lg tracking-tight ${textColor}`}>
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
                                    `text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-[#C9A84C] after:transition-all after:duration-300 hover:after:w-full
                  ${isActive ? 'text-[#C9A84C] after:w-full' : `${textColor} hover:text-[#C9A84C]`}`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>

                    {/* CTA button */}
                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href={`tel:${siteConfig.phone}`}
                            className="flex items-center gap-2 bg-[#C9A84C] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#A0822A] transition-colors duration-200"
                        >
                            <Phone size={14} />
                            Call Us
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`md:hidden p-2 rounded-lg ${textColor} hover:text-[#C9A84C]`}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden bg-[#0F1E3C] overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
                    {navLinks.map(({ label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `text-base font-medium py-2 border-b border-white/10 transition-colors ${isActive ? 'text-[#C9A84C]' : 'text-white hover:text-[#C9A84C]'
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                    <a
                        href={`tel:${siteConfig.phone}`}
                        className="mt-2 flex items-center justify-center gap-2 bg-[#C9A84C] text-white px-5 py-3 rounded-full text-sm font-semibold"
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
