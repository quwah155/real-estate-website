import { Link } from 'react-router-dom';
import { ArrowRight, Search, Star, Shield, Clock, MapPin, Award, TrendingUp, Headphones } from 'lucide-react';
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
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F1E3C]/85 via-[#0F1E3C]/70 to-[#0A1628]/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                Lagos's #1 Trusted Real Estate Agency
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 font-serif">
                Find Your Dream{' '}
                <span className="gold-text">Property</span>{' '}
                in Lagos
            </h1>

            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                {siteConfig.subTagline}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                <Link
                    to="/properties"
                    className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#A0822A] text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 shadow-lg"
                >
                    View Listings <ArrowRight size={18} />
                </Link>
                <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-200"
                >
                    Contact Agent
                </a>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
                {siteConfig.stats.map(({ label, value }) => (
                    <div key={label} className="text-center">
                        <p className="text-3xl sm:text-4xl font-bold text-[#C9A84C] mb-1">{value}</p>
                        <p className="text-white/70 text-sm">{label}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
                <div className="w-1 h-3 rounded-full bg-white/60" />
            </div>
        </div>
    </section>
);

const FeaturedProperties = () => {
    const featured = properties.filter(p => p.featured).slice(0, 6);
    return (
        <section className="py-20 bg-[#F8F7F4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12">
                    <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Portfolio</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1E3C] font-serif mb-4">Featured Properties</h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Hand-picked premium listings across Lagos's most desirable neighbourhoods.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map(p => (
                        <PropertyCard key={p.id} property={p} />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        to="/properties"
                        className="inline-flex items-center gap-2 border-2 border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-200"
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
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Why Us</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1E3C] font-serif mb-4">The LuxuryKey Difference</h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                    We go beyond listings — we deliver certainty, speed, and an exceptional client experience.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteConfig.whyUs.map(({ icon, title, desc }) => {
                    const Icon = iconMap[icon] || Shield;
                    return (
                        <div key={title} className="group p-8 rounded-2xl border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-xl transition-all duration-300 bg-white">
                            <div className="w-14 h-14 rounded-2xl bg-[#C9A84C]/10 flex items-center justify-center mb-5 group-hover:bg-[#C9A84C] transition-colors duration-300">
                                <Icon size={24} className="text-[#C9A84C] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="font-bold text-[#0F1E3C] text-lg mb-2">{title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

const TestimonialsSection = () => (
    <section className="py-20 bg-[#0F1E3C] relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#C9A84C]/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
                <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-4">What Our Clients Say</h2>
                <p className="text-white/60 max-w-xl mx-auto">Real words from real clients who found their perfect property with us.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {siteConfig.testimonials.map(({ id, name, role, avatar, text, rating }) => (
                    <div key={id} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors duration-300">
                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                            {Array.from({ length: rating }).map((_, i) => (
                                <Star key={i} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
                            ))}
                        </div>
                        {/* Quote */}
                        <p className="text-white/80 text-sm leading-relaxed mb-6">"{text}"</p>
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
                                <p className="text-white/50 text-xs">{role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CTABanner = () => (
    <section className="py-20 bg-gradient-to-br from-[#C9A84C] to-[#A0822A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-4">
                Ready to Find Your Perfect Property?
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
                Let's talk. Our agents are available now to help you navigate the Lagos market with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    to="/properties"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#C9A84C] px-8 py-4 rounded-full font-bold text-base hover:bg-white/90 transition-all duration-200 hover:scale-105"
                >
                    Browse Listings <ArrowRight size={18} />
                </Link>
                <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello, I would like to schedule a property consultation.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/15 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/25 transition-all duration-200"
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
