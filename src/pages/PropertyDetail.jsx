import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Bed, Bath, Maximize2, MapPin, ArrowLeft, Check,
    MessageCircle, Phone, ChevronLeft, ChevronRight, Share2
} from 'lucide-react';
import properties from '../data/properties.json';
import { formatPrice } from '../utils/helpers';
import { siteConfig } from '../data/siteConfig';

const InquiryForm = ({ propertyTitle }) => {
    const [form, setForm] = useState({ name: '', phone: '', email: '', budget: '', message: `Hi, I'm interested in "${propertyTitle}". Please get in touch.` });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        // Simulate submission delay — replace with real API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1200);
    };

    if (submitted) {
        return (
            <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Inquiry Sent!</h3>
                <p className="text-gray-500 text-sm">We'll be in touch within 24 hours. You can also WhatsApp us for a faster response.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {[
                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. Amaka Johnson', required: true },
                { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+234 800 000 0000', required: true },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com', required: false },
                { name: 'budget', label: 'Your Budget', type: 'text', placeholder: 'e.g. ₦50,000,000', required: false },
            ].map(({ name, label, type, placeholder, required }) => (
                <div key={name}>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>
                    <input
                        type={type}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required={required}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                    />
                </div>
            ))}
            <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Message</label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F1E3C] hover:bg-[#1A3260] text-white py-4 rounded-xl font-semibold text-sm transition-colors disabled:opacity-60"
            >
                {loading ? 'Sending…' : 'Send Inquiry'}
            </button>
        </form>
    );
};

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const property = properties.find(p => p.id === Number(id));
    const [activeImg, setActiveImg] = useState(0);

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-24">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Property not found</h2>
                <Link to="/properties" className="text-[#C9A84C] font-semibold hover:underline">← Back to listings</Link>
            </div>
        );
    }

    const { title, type, price, priceLabel, location, description, bedrooms, bathrooms, toilets, size, sizeUnit, features, images, tag } = property;

    const waMsgText = `Hi, I'm interested in ${title} (${location}). Please share more details.`;

    const prevImg = () => setActiveImg(i => (i === 0 ? images.length - 1 : i - 1));
    const nextImg = () => setActiveImg(i => (i === images.length - 1 ? 0 : i + 1));

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-[#0F1E3C] pt-24 pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-white/60 hover:text-white transition-colors">
                        <ArrowLeft size={14} /> Back
                    </button>
                    <span className="text-white/30">/</span>
                    <Link to="/properties" className="text-white/60 hover:text-white transition-colors">Properties</Link>
                    <span className="text-white/30">/</span>
                    <span className="text-white/80 truncate max-w-48">{title}</span>
                </div>
            </div>

            <div className="bg-[#F8F7F4] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-10">

                        {/* Left: Gallery + Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Gallery */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                                {/* Main image */}
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <img
                                        src={images[activeImg]}
                                        alt={`${title} — image ${activeImg + 1}`}
                                        className="w-full h-full object-cover transition-opacity duration-300"
                                        loading={activeImg === 0 ? 'eager' : 'lazy'}
                                    />
                                    {images.length > 1 && (
                                        <>
                                            <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
                                                <ChevronRight size={20} />
                                            </button>
                                        </>
                                    )}
                                    {/* Counter */}
                                    <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                                        {activeImg + 1} / {images.length}
                                    </div>
                                </div>
                                {/* Thumbnails */}
                                {images.length > 1 && (
                                    <div className="flex gap-2 p-4 overflow-x-auto">
                                        {images.map((img, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveImg(i)}
                                                className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#C9A84C]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                            >
                                                <img src={img} alt={`thumb ${i}`} className="w-full h-full object-cover" loading="lazy" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Title + badge */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${type === 'sale' ? 'bg-[#0F1E3C] text-white' : 'bg-[#C9A84C] text-white'}`}>
                                                For {type === 'sale' ? 'Sale' : 'Rent'}
                                            </span>
                                            {tag && <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">{tag}</span>}
                                        </div>
                                        <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1E3C] font-serif">{title}</h1>
                                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                                            <MapPin size={14} className="text-[#C9A84C]" /> {location}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-bold text-[#C9A84C]">{formatPrice(price)}</p>
                                        {priceLabel && <p className="text-gray-400 text-sm">per {priceLabel}</p>}
                                    </div>
                                </div>

                                {/* Quick stats */}
                                <div className="flex flex-wrap gap-6 py-4 border-t border-gray-100 text-sm text-gray-600">
                                    {bedrooms > 0 && <span className="flex items-center gap-2"><Bed size={16} className="text-[#C9A84C]" /> {bedrooms} Bedroom{bedrooms > 1 ? 's' : ''}</span>}
                                    {bathrooms > 0 && <span className="flex items-center gap-2"><Bath size={16} className="text-[#C9A84C]" /> {bathrooms} Bathroom{bathrooms > 1 ? 's' : ''}</span>}
                                    {size > 0 && <span className="flex items-center gap-2"><Maximize2 size={16} className="text-[#C9A84C]" /> {size} {sizeUnit}</span>}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-[#0F1E3C] mb-4">Property Description</h2>
                                <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
                            </div>

                            {/* Features */}
                            {features.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-lg font-bold text-[#0F1E3C] mb-4">Property Features</h2>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {features.map(f => (
                                            <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                                                <span className="w-5 h-5 rounded-full bg-[#C9A84C]/15 flex items-center justify-center shrink-0">
                                                    <Check size={11} className="text-[#C9A84C]" />
                                                </span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Right: Sticky sidebar */}
                        <div className="mt-6 lg:mt-0">
                            <div className="sticky top-24 space-y-4">
                                {/* Inquiry form card */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-[#0F1E3C] mb-1">Request a Viewing</h3>
                                    <p className="text-xs text-gray-400 mb-5">Fill in your details and we'll reach out promptly.</p>
                                    <InquiryForm propertyTitle={title} />
                                </div>

                                {/* Agent card */}
                                <div className="bg-[#0F1E3C] rounded-2xl p-6 text-white">
                                    <div className="flex items-center gap-3 mb-4">
                                        <img
                                            src={siteConfig.agentPhoto}
                                            alt={siteConfig.agentName}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-[#C9A84C]"
                                            loading="lazy"
                                        />
                                        <div>
                                            <p className="font-bold">{siteConfig.agentName}</p>
                                            <p className="text-white/60 text-xs">{siteConfig.agentTitle}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <a
                                            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(waMsgText)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1ebe5c] transition-colors"
                                        >
                                            <MessageCircle size={16} /> WhatsApp Agent
                                        </a>
                                        <a
                                            href={`tel:${siteConfig.phone}`}
                                            className="flex items-center justify-center gap-2 w-full border border-white/20 text-white py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors"
                                        >
                                            <Phone size={16} /> Call Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyDetail;
