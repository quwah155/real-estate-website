import { Award, Check, Users, Home, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

const trustBadges = [
    { label: 'NIESV Member', icon: Award },
    { label: 'Verified Listings', icon: Check },
    { label: '500+ Happy Clients', icon: Users },
    { label: '50+ Properties Sold', icon: Home },
    { label: '8+ Years Experience', icon: TrendingUp },
];

const About = () => (
    <>
        {/* Page hero */}
        <div className="pt-28 pb-14 relative overflow-hidden" style={{ background: 'var(--section-dark-bg)' }}>
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 50% 70% at 80% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <p className="text-[#C9A84C] font-semibold text-xs uppercase tracking-widest mb-3">Our Story</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif mb-4">About {siteConfig.agencyName}</h1>
                <div className="gold-divider max-w-20 mx-auto mb-4" />
                <p className="max-w-xl mx-auto" style={{ color: 'var(--section-dark-text)' }}>
                    Learn who we are, what we stand for, and why hundreds of Lagos families trust us.
                </p>
            </div>
        </div>

        <div style={{ background: 'var(--bg-primary)' }}>
            {/* Agent intro */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Photo */}
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden"
                            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(201,168,76,0.15)' }}>
                            <img
                                src={siteConfig.agentPhoto}
                                alt={siteConfig.agentName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating stat card */}
                        <div className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl"
                            style={{ background: 'linear-gradient(135deg, #C9A84C, #A0822A)', boxShadow: '0 16px 48px rgba(201,168,76,0.35)' }}>
                            <p className="text-3xl font-bold text-white">8+</p>
                            <p className="text-white/80 text-xs">Years in Lagos Real Estate</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <p className="text-[#C9A84C] font-semibold text-xs uppercase tracking-widest mb-3">Meet the Agent</p>
                        <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-2" style={{ color: 'var(--text-primary)' }}>
                            {siteConfig.agentName}
                        </h2>
                        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{siteConfig.agentTitle}</p>

                        <div className="gold-divider mb-6" />

                        {siteConfig.aboutText.map((para, i) => (
                            <p key={i} className="leading-relaxed mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{para}</p>
                        ))}

                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link
                                to="/properties"
                                className="bg-gradient-to-r from-[#C9A84C] to-[#A0822A] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(201,168,76,0.4)]"
                            >
                                View Listings
                            </Link>
                            <Link
                                to="/contact"
                                className="border-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
                                style={{ borderColor: 'var(--text-primary)', color: 'var(--text-primary)' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 relative overflow-hidden" style={{ background: 'var(--section-dark-bg)' }}>
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
                        {siteConfig.stats.map(({ label, value }) => (
                            <div key={label}>
                                <p className="text-4xl sm:text-5xl font-bold text-[#C9A84C] mb-2">{value}</p>
                                <p className="text-sm" style={{ color: 'var(--section-dark-text)' }}>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust badges */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-12">
                    <p className="text-[#C9A84C] font-semibold text-xs uppercase tracking-widest mb-3">Credentials</p>
                    <h2 className="text-3xl font-bold font-serif" style={{ color: 'var(--text-primary)' }}>Why Clients Trust Us</h2>
                    <div className="gold-divider max-w-20 mx-auto mt-4" />
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {trustBadges.map(({ label, icon: Icon }) => (
                        <div key={label}
                            className="flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-300 luxury-card">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.12)' }}>
                                <Icon size={16} className="text-[#C9A84C]" />
                            </div>
                            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </>
);

export default About;
