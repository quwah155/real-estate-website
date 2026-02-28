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
        <div className="bg-[#0F1E3C] pt-28 pb-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif mb-4">About {siteConfig.agencyName}</h1>
                <p className="text-white/60 max-w-xl mx-auto">Learn who we are, what we stand for, and why hundreds of Lagos families trust us.</p>
            </div>
        </div>

        <div className="bg-[#F8F7F4]">
            {/* Agent intro */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Photo */}
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={siteConfig.agentPhoto}
                                alt={siteConfig.agentName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating stat card */}
                        <div className="absolute -bottom-6 -right-6 bg-[#C9A84C] text-white px-6 py-4 rounded-2xl shadow-xl">
                            <p className="text-3xl font-bold">8+</p>
                            <p className="text-white/80 text-xs">Years in Lagos Real Estate</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Meet the Agent</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1E3C] font-serif mb-2">{siteConfig.agentName}</h2>
                        <p className="text-gray-400 text-sm mb-6">{siteConfig.agentTitle}</p>

                        {siteConfig.aboutText.map((para, i) => (
                            <p key={i} className="text-gray-600 leading-relaxed mb-4 text-sm">{para}</p>
                        ))}

                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link
                                to="/properties"
                                className="bg-[#C9A84C] hover:bg-[#A0822A] text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
                            >
                                View Listings
                            </Link>
                            <Link
                                to="/contact"
                                className="border-2 border-[#0F1E3C] text-[#0F1E3C] hover:bg-[#0F1E3C] hover:text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-[#0F1E3C] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
                        {siteConfig.stats.map(({ label, value }) => (
                            <div key={label}>
                                <p className="text-4xl sm:text-5xl font-bold text-[#C9A84C] mb-2">{value}</p>
                                <p className="text-white/60 text-sm">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust badges */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                    <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Credentials</p>
                    <h2 className="text-3xl font-bold text-[#0F1E3C] font-serif">Why Clients Trust Us</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {trustBadges.map(({ label, icon: Icon }) => (
                        <div key={label} className="flex items-center gap-3 bg-white border border-gray-100 px-6 py-4 rounded-full shadow-sm hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-200">
                            <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
                                <Icon size={16} className="text-[#C9A84C]" />
                            </div>
                            <span className="font-semibold text-gray-700 text-sm">{label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </>
);

export default About;
