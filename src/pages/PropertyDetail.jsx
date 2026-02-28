import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Bed, Bath, Maximize2, MapPin, ArrowLeft, Check,
    MessageCircle, Phone, ChevronLeft, ChevronRight
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
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
    };

    if (submitted) {
        return (
            <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(37,211,102,0.12)' }}>
                    <Check size={28} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Inquiry Sent!</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>We'll be in touch within 24 hours. You can also WhatsApp us for a faster response.</p>
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
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                        style={{ color: 'var(--text-muted)' }}>{label}</label>
                    <input
                        type={type}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required={required}
                        className="lk-input w-full px-4 py-3 border rounded-xl text-sm"
                        style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                    />
                </div>
            ))}
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                    style={{ color: 'var(--text-muted)' }}>Message</label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="lk-input w-full px-4 py-3 border rounded-xl text-sm resize-none"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full text-white py-4 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-60 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #1A3260, #0F1E3C)', boxShadow: '0 4px 20px rgba(15,30,60,0.3)' }}
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
            <div className="min-h-screen flex flex-col items-center justify-center pt-24"
                style={{ background: 'var(--bg-primary)' }}>
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Property not found</h2>
                <Link to="/properties" className="text-[#C9A84C] font-semibold hover:underline">← Back to listings</Link>
            </div>
        );
    }

    const { title, type, price, priceLabel, location, description, bedrooms, bathrooms, size, sizeUnit, features, images, tag } = property;
    const waMsgText = `Hi, I'm interested in ${title} (${location}). Please share more details.`;

    const prevImg = () => setActiveImg(i => (i === 0 ? images.length - 1 : i - 1));
    const nextImg = () => setActiveImg(i => (i === images.length - 1 ? 0 : i + 1));

    return (
        <>
            {/* Breadcrumb */}
            <div className="pt-24 pb-6 relative overflow-hidden" style={{ background: 'var(--section-dark-bg)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-1 transition-colors hover:text-[#C9A84C]"
                        style={{ color: 'rgba(255,255,255,0.55)' }}>
                        <ArrowLeft size={14} /> Back
                    </button>
                    <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
                    <Link to="/properties" className="transition-colors hover:text-white"
                        style={{ color: 'rgba(255,255,255,0.55)' }}>Properties</Link>
                    <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
                    <span className="text-white/80 truncate max-w-48">{title}</span>
                </div>
            </div>

            <div className="min-h-screen py-8" style={{ background: 'var(--bg-primary)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-10">

                        {/* Left: Gallery + Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Gallery */}
                            <div className="rounded-2xl overflow-hidden luxury-card">
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
                                            <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/65 transition-colors backdrop-blur-sm">
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/65 transition-colors backdrop-blur-sm">
                                                <ChevronRight size={20} />
                                            </button>
                                        </>
                                    )}
                                    {/* Counter */}
                                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                                        {activeImg + 1} / {images.length}
                                    </div>
                                </div>
                                {/* Thumbnails */}
                                {images.length > 1 && (
                                    <div className="flex gap-2 p-4 overflow-x-auto" style={{ background: 'var(--card-bg)' }}>
                                        {images.map((img, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveImg(i)}
                                                className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#C9A84C]' : 'border-transparent opacity-55 hover:opacity-90'}`}
                                            >
                                                <img src={img} alt={`thumb ${i}`} className="w-full h-full object-cover" loading="lazy" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Title + badge */}
                            <div className="rounded-2xl p-6 luxury-card">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${type === 'sale' ? 'bg-[#0F1E3C] text-white' : 'bg-[#C9A84C] text-white'}`}>
                                                For {type === 'sale' ? 'Sale' : 'Rent'}
                                            </span>
                                            {tag && <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}>{tag}</span>}
                                        </div>
                                        <h1 className="text-2xl sm:text-3xl font-bold font-serif" style={{ color: 'var(--text-primary)' }}>{title}</h1>
                                        <div className="flex items-center gap-1 text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                                            <MapPin size={14} className="text-[#C9A84C]" /> {location}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-bold text-[#C9A84C]">{formatPrice(price)}</p>
                                        {priceLabel && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>per {priceLabel}</p>}
                                    </div>
                                </div>

                                {/* Quick stats */}
                                <div className="flex flex-wrap gap-6 py-4 border-t text-sm"
                                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                    {bedrooms > 0 && <span className="flex items-center gap-2"><Bed size={16} className="text-[#C9A84C]" /> {bedrooms} Bedroom{bedrooms > 1 ? 's' : ''}</span>}
                                    {bathrooms > 0 && <span className="flex items-center gap-2"><Bath size={16} className="text-[#C9A84C]" /> {bathrooms} Bathroom{bathrooms > 1 ? 's' : ''}</span>}
                                    {size > 0 && <span className="flex items-center gap-2"><Maximize2 size={16} className="text-[#C9A84C]" /> {size} {sizeUnit}</span>}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="rounded-2xl p-6 luxury-card">
                                <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Property Description</h2>
                                <p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>{description}</p>
                            </div>

                            {/* Features */}
                            {features.length > 0 && (
                                <div className="rounded-2xl p-6 luxury-card">
                                    <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Property Features</h2>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {features.map(f => (
                                            <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                                    style={{ background: 'rgba(201,168,76,0.12)' }}>
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
                                <div className="rounded-2xl p-6 luxury-card">
                                    <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Request a Viewing</h3>
                                    <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Fill in your details and we'll reach out promptly.</p>
                                    <InquiryForm propertyTitle={title} />
                                </div>

                                {/* Agent card */}
                                <div className="rounded-2xl p-6 relative overflow-hidden"
                                    style={{ background: 'var(--section-dark-bg)', border: '1px solid rgba(201,168,76,0.12)' }}>
                                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                                        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                                    <div className="flex items-center gap-3 mb-4 relative z-10">
                                        <img
                                            src={siteConfig.agentPhoto}
                                            alt={siteConfig.agentName}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-[#C9A84C]"
                                            loading="lazy"
                                        />
                                        <div>
                                            <p className="font-bold text-white">{siteConfig.agentName}</p>
                                            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{siteConfig.agentTitle}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 relative z-10">
                                        <a
                                            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(waMsgText)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-colors text-white"
                                            style={{ background: '#25D366' }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#1ebe5c'}
                                            onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
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
