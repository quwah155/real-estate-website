import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const WhatsAppButton = ({ message }) => {
    const msg = encodeURIComponent(message || siteConfig.whatsappMessage);
    const url = `https://wa.me/${siteConfig.whatsapp}?text=${msg}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 group"
        >
            <MessageCircle size={26} className="fill-white" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40 pointer-events-none" />
        </a>
    );
};

export default WhatsAppButton;
