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
            <div className="bg-[#0F1E3C] pt-28 pb-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif mb-4">Contact Us</h1>
                    <p className="text-white/60 max-w-lg mx-auto">Have a question or ready to start your property journey? We'd love to hear from you.</p>
                </div>
            </div>

            <div className="bg-[#F8F7F4] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                        {/* Left: Info + map */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Contact info card */}
                            <div className="bg-[#0F1E3C] rounded-2xl p-7 text-white">
                                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                                <ul className="space-y-5">
                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/15 flex items-center justify-center shrink-0">
                                            <MapPin size={18} className="text-[#C9A84C]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/50 mb-1 uppercase tracking-wider">Office Address</p>
                                            <p className="text-sm leading-relaxed">{siteConfig.address}</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/15 flex items-center justify-center shrink-0">
                                            <Phone size={18} className="text-[#C9A84C]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/50 mb-1 uppercase tracking-wider">Phone</p>
                                            <a href={`tel:${siteConfig.phone}`} className="text-sm hover:text-[#C9A84C] transition-colors">{siteConfig.phone}</a>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/15 flex items-center justify-center shrink-0">
                                            <Mail size={18} className="text-[#C9A84C]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/50 mb-1 uppercase tracking-wider">Email</p>
                                            <a href={`mailto:${siteConfig.email}`} className="text-sm hover:text-[#C9A84C] transition-colors">{siteConfig.email}</a>
                                        </div>
                                    </li>
                                </ul>

                                {/* WhatsApp CTA */}
                                <a
                                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#1ebe5c] transition-colors"
                                >
                                    <MessageCircle size={18} /> Chat on WhatsApp
                                </a>
                            </div>

                            {/* Map */}
                            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                                <iframe
                                    title="Office Location"
                                    src={siteConfig.googleMapsEmbed}
                                    width="100%"
                                    height="280"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            {/* Office hours */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100">
                                <h3 className="font-bold text-[#0F1E3C] mb-4">Office Hours</h3>
                                <ul className="space-y-2 text-sm">
                                    {[
                                        { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                                        { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
                                        { day: 'Sunday', hours: 'By appointment' },
                                    ].map(({ day, hours }) => (
                                        <li key={day} className="flex justify-between text-gray-600">
                                            <span className="font-medium">{day}</span>
                                            <span className="text-gray-400">{hours}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-[#0F1E3C] font-serif mb-2">Send Us a Message</h2>
                                <p className="text-gray-400 text-sm mb-8">We typically respond within a few hours.</p>

                                {submitted ? (
                                    <div className="text-center py-16">
                                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                            <Check size={36} className="text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Message Received!</h3>
                                        <p className="text-gray-500">We'll get back to you shortly. Feel free to also reach us on WhatsApp for a faster response.</p>
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
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Message</label>
                                            <textarea
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                rows={6}
                                                placeholder="Tell us more about what you're looking for…"
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-[#C9A84C] transition-colors"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#C9A84C] hover:bg-[#A0822A] text-white py-4 rounded-xl font-bold text-sm transition-colors disabled:opacity-60"
                                        >
                                            {loading ? 'Sending…' : 'Send Message'}
                                        </button>
                                        <p className="text-center text-xs text-gray-400">
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
