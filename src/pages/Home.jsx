import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, MapPin, Award, TrendingUp, Headphones } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import properties from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';

// ── Sub-components ──────────────────────────────────────────

const HeroSection = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop&q=85"
                alt="Luxury Lagos property"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,12,22,0.88) 0%, rgba(15,30,60,0.75) 60%, rgba(10,18,40,0.65) 100%)' }} />
            {/* Subtle gold accent orbs */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
            <div className="absolute bottom-1/3 left-1/5 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 text-white text-xs font-medium px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                Lagos's #1 Trusted Real Estate Agency
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 font-serif">
                Find Your Dream{' '}
                <span className="gold-text">Property</span>{' '}
                in Lagos
            </h1>

            <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                {siteConfig.subTagline}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                <Link
                    to="/properties"
                    className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #A0822A)', boxShadow: '0 8px 32px rgba(201,168,76,0.35)' }}
                >
                    View Listings <ArrowRight size={18} />
                </Link>
                <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/25 hover:bg-white/18 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
                >
                    Contact Agent
                </a>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
                {siteConfig.stats.map(({ label, value }) => (
                    <div key={label} className="text-center">
                        <p className="text-3xl sm:text-4xl font-bold text-[#C9A84C] mb-1">{value}</p>
                        <p className="text-white/65 text-sm">{label}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/35 flex items-start justify-center pt-2">
                <div className="w-1 h-3 rounded-full bg-white/55" />
            </div>
        </div>
    </section>
);

const FeaturedProperties = () => {
    const featured = properties.filter(p => p.featured).slice(0, 6);
    return (
        <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-14">
                    <p className="text-[#C9A84C] font-semibold text-xs uppercase tracking-widest mb-3">Portfolio</p>
                    <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4" style={{ color: 'var(--text-primary)' }}>
                        Featured Properties
                    </h2>
                    <div className="gold-divider max-w-24 mx-auto mb-4" />
                    <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Hand-picked premium listings across Lagos's most desirable neighbourhoods.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {featured.map(p => (
                        <PropertyCard key={p.id} property={p} />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-14">
                    <Link
                        to="/properties"
                        className="inline-flex items-center gap-2 border-2 border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_24px_rgba(201,168,76,0.35)]"
                    >
                        View All Properties <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

const iconMap = { Shield, Clock, MapPin, Award, TrendingUp, Headphones };

const WhyChooseUs = () => (
    <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
                <p className="text-[#C9A84C] font-semibold text-xs uppercase tracking-widest mb-3">Why Us</p>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4" style={{ color: 'var(--text-primary)' }}>
                    The LuxuryKey Difference
                </h2>
                <div className="gold-divider max-w-24 mx-auto mb-4" />
                <p className="max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    We go beyond listings — we deliver certainty, speed, and an exceptional client experience.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteConfig.whyUs.map(({ icon, title, desc }) => {
                    const Icon = iconMap[icon] || Shield;
                    return (
                        <div
                            key={title}
                            className="group p-8 rounded-2xl transition-all duration-400 luxury-card"
                        >
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-400"
                                style={{ background: 'rgba(201,168,76,0.10)' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#C9A84C'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.10)'}>
                                <Icon size={24} className="text-[#C9A84C] group-hover:text-white transition-colors duration-400" />
                            </div>
                            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

const TestimonialsSection = () => (
    <section className="py-24 relative overflow-hidden" style={{ background: 'var(--section-dark-bg)' }}>
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-14">
                <p className="text-[#C9A84C] font-semibold text-xs uppercase tracking-widest mb-3">Testimonials</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-4">What Our Clients Say</h2>
                <div className="gold-divider max-w-24 mx-auto mb-4" />
                <p className="max-w-xl mx-auto" style={{ color: 'var(--section-dark-text)' }}>Real words from real clients who found their perfect property with us.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {siteConfig.testimonials.map(({ id, name, role, avatar, text, rating }) => (
                    <div key={id} className="rounded-2xl p-7 transition-all duration-300 hover:border-[#C9A84C]/30"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}>
                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                            {Array.from({ length: rating }).map((_, i) => (
                                <Star key={i} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
                            ))}
                        </div>
                        {/* Quote */}
                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.78)' }}>"{text}"</p>
                        {/* Author */}
                        <div className="flex items-center gap-3">
                            <img
                                src={avatar}
                                alt={name}
                                className="w-11 h-11 rounded-full object-cover border-2 border-[#C9A84C]/40"
                                loading="lazy"
                            />
                            <div>
                                <p className="text-white font-semibold text-sm">{name}</p>
                                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CTABanner = () => (
    <section className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1200 0%, #3D2800 30%, #C9A84C 70%, #A0822A 100%)' }}>
        {/* Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute w-96 h-96 rounded-full -top-32 -left-32"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-4">
                Ready to Find Your Perfect Property?
            </h2>
            <p className="text-white/85 text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed">
                Let's talk. Our agents are available now to help you navigate the Lagos market with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    to="/properties"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#A0822A] px-8 py-4 rounded-full font-bold text-base hover:bg-white/93 transition-all duration-300 hover:scale-105"
                    style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
                >
                    Browse Listings <ArrowRight size={18} />
                </Link>
                <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello, I would like to schedule a property consultation.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/12 border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/22 transition-all duration-300"
                >
                    WhatsApp Us Now
                </a>
            </div>
        </div>
    </section>
);

// ── Page ──────────────────────────────────────────────────────

const Home = () => (
    <>
        <HeroSection />
        <FeaturedProperties />
        <WhyChooseUs />
        <TestimonialsSection />
        <CTABanner />
    </>
);

export default Home;
