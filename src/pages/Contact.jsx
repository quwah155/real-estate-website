import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Check } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const Contact = () => {
    const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
    };

    return (
        <>
            {/* Header */}
            <div className="pt-28 pb-14 relative overflow-hidden" style={{ background: 'var(--section-dark-bg)' }}>
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 60% 80% at 30% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <p className="text-[#C9A84C] font-semibold text-xs uppercase tracking-widest mb-3">Get In Touch</p>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif mb-4">Contact Us</h1>
                    <div className="gold-divider max-w-20 mx-auto mb-4" />
                    <p className="max-w-lg mx-auto" style={{ color: 'var(--section-dark-text)' }}>
                        Have a question or ready to start your property journey? We'd love to hear from you.
                    </p>
                </div>
            </div>

            <div className="min-h-screen py-16" style={{ background: 'var(--bg-primary)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                        {/* Left: Info + map */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Contact info card */}
                            <div className="rounded-2xl p-7 text-white relative overflow-hidden"
                                style={{ background: 'var(--section-dark-bg)', border: '1px solid rgba(201,168,76,0.12)' }}>
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                                    style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', transform: 'translate(40%, -40%)' }} />
                                <h2 className="text-xl font-bold mb-6 relative z-10">Contact Information</h2>
                                <ul className="space-y-5 relative z-10">
                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ background: 'rgba(201,168,76,0.15)' }}>
                                            <MapPin size={18} className="text-[#C9A84C]" />
                                        </div>
                                        <div>
                                            <p className="text-xs mb-1 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>Office Address</p>
                                            <p className="text-sm leading-relaxed">{siteConfig.address}</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ background: 'rgba(201,168,76,0.15)' }}>
                                            <Phone size={18} className="text-[#C9A84C]" />
                                        </div>
                                        <div>
                                            <p className="text-xs mb-1 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>Phone</p>
                                            <a href={`tel:${siteConfig.phone}`} className="text-sm hover:text-[#C9A84C] transition-colors">{siteConfig.phone}</a>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ background: 'rgba(201,168,76,0.15)' }}>
                                            <Mail size={18} className="text-[#C9A84C]" />
                                        </div>
                                        <div>
                                            <p className="text-xs mb-1 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>Email</p>
                                            <a href={`mailto:${siteConfig.email}`} className="text-sm hover:text-[#C9A84C] transition-colors">{siteConfig.email}</a>
                                        </div>
                                    </li>
                                </ul>

                                {/* WhatsApp CTA */}
                                <a
                                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 relative z-10"
                                    style={{ background: '#25D366', color: '#fff' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#1ebe5c'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
                                >
                                    <MessageCircle size={18} /> Chat on WhatsApp
                                </a>
                            </div>

                            {/* Map */}
                            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                                <iframe
                                    title="Office Location"
                                    src={siteConfig.googleMapsEmbed}
                                    width="100%"
                                    height="280"
                                    style={{ border: 0, display: 'block' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            {/* Office hours */}
                            <div className="rounded-2xl p-6 luxury-card">
                                <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Office Hours</h3>
                                <ul className="space-y-2 text-sm">
                                    {[
                                        { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                                        { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
                                        { day: 'Sunday', hours: 'By appointment' },
                                    ].map(({ day, hours }) => (
                                        <li key={day} className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{day}</span>
                                            <span style={{ color: 'var(--text-muted)' }}>{hours}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="lg:col-span-3">
                            <div className="rounded-2xl p-8 luxury-card">
                                <h2 className="text-2xl font-bold font-serif mb-2" style={{ color: 'var(--text-primary)' }}>Send Us a Message</h2>
                                <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>We typically respond within a few hours.</p>

                                {submitted ? (
                                    <div className="text-center py-16">
                                        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                                            style={{ background: 'rgba(37,211,102,0.12)' }}>
                                            <Check size={36} className="text-green-500" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Message Received!</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you shortly. Feel free to also reach us on WhatsApp for a faster response.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            {[
                                                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. Tunde Adeyemi', required: true },
                                                { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+234 800 000 0000', required: true },
                                                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com', required: false },
                                                { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Property inquiry, valuation, etc.', required: false },
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
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                                                style={{ color: 'var(--text-muted)' }}>Message</label>
                                            <textarea
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                rows={6}
                                                placeholder="Tell us more about what you're looking for…"
                                                required
                                                className="lk-input w-full px-4 py-3 border rounded-xl text-sm resize-none"
                                                style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full text-white py-4 rounded-xl font-bold text-sm transition-all duration-300 disabled:opacity-60 hover:scale-[1.02]"
                                            style={{ background: 'linear-gradient(135deg, #C9A84C, #A0822A)', boxShadow: '0 4px 20px rgba(201,168,76,0.3)' }}
                                        >
                                            {loading ? 'Sending…' : 'Send Message'}
                                        </button>
                                        <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                                            Or reach us instantly on{' '}
                                            <a
                                                href={`https://wa.me/${siteConfig.whatsapp}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#25D366] font-semibold hover:underline"
                                            >
                                                WhatsApp
                                            </a>
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
