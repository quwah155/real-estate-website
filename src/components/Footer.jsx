import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer style={{ background: 'var(--section-dark-bg)', color: '#fff', borderTop: '1px solid rgba(201,168,76,0.12)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#A0822A] flex items-center justify-center shadow-md">
                                <span className="text-white font-bold text-lg select-none">L</span>
                            </div>
                            <span className="font-bold text-lg tracking-tight">{siteConfig.agencyName}</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Lagos's most trusted real estate partner. Premium listings, verified titles, and expert guidance.
                        </p>
                        {/* Gold divider */}
                        <div className="gold-divider mb-6" />
                        {/* Social */}
                        <div className="flex gap-3">
                            {[
                                { icon: Instagram, href: siteConfig.social.instagram },
                                { icon: Facebook, href: siteConfig.social.facebook },
                                { icon: Linkedin, href: siteConfig.social.linkedin },
                                { icon: Twitter, href: siteConfig.social.twitter },
                            ].map(({ icon: Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 hover:shadow-[0_0_12px_rgba(201,168,76,0.3)]"
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-xs uppercase tracking-widest" style={{ color: '#C9A84C' }}>Quick Links</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Home', to: '/' },
                                { label: 'Properties', to: '/properties' },
                                { label: 'For Sale', to: '/properties?type=sale' },
                                { label: 'For Rent', to: '/properties?type=rent' },
                                { label: 'About Us', to: '/about' },
                                { label: 'Contact', to: '/contact' },
                            ].map(({ label, to }) => (
                                <li key={label}>
                                    <Link
                                        to={to}
                                        className="text-gray-400 text-sm hover:text-[#C9A84C] transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Locations */}
                    <div>
                        <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest" style={{ color: '#C9A84C' }}>Areas We Cover</h4>
                        <ul className="space-y-2.5">
                            {['Lekki Phase 1', 'Victoria Island', 'Ikoyi', 'Banana Island', 'Surulere', 'Ajah', 'Yaba', 'Epe'].map(area => (
                                <li key={area}>
                                    <Link
                                        to={`/properties?location=${encodeURIComponent(area)}`}
                                        className="text-gray-400 text-sm hover:text-[#C9A84C] transition-colors"
                                    >
                                        {area}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest" style={{ color: '#C9A84C' }}>Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <MapPin size={16} className="text-[#C9A84C] shrink-0 mt-0.5" />
                                <span className="text-gray-400 text-sm">{siteConfig.address}</span>
                            </li>
                            <li>
                                <a href={`tel:${siteConfig.phone}`} className="flex gap-3 text-gray-400 hover:text-[#C9A84C] transition-colors text-sm">
                                    <Phone size={16} className="text-[#C9A84C] shrink-0" />
                                    {siteConfig.phone}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${siteConfig.email}`} className="flex gap-3 text-gray-400 hover:text-[#C9A84C] transition-colors text-sm">
                                    <Mail size={16} className="text-[#C9A84C] shrink-0" />
                                    {siteConfig.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
                    style={{ borderColor: 'rgba(201,168,76,0.12)' }}>
                    <p className="text-gray-500 text-xs">
                        &copy; {year} {siteConfig.agencyName}. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs">
                        Registered with NIESV · RC 1234567
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
