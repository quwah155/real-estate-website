import { formatPrice } from '../utils/helpers';
import { Bed, Bath, Maximize2, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, className = '' }) => {
    const { id, title, type, price, priceLabel, location, shortDesc, bedrooms, size, sizeUnit, images, tag } = property;

    return (
        <Link
            to={`/properties/${id}`}
            className={`group rounded-2xl overflow-hidden flex flex-col luxury-card ${className}`}
        >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={images[0]}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop'; }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                {/* Tags */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm ${type === 'sale'
                            ? 'bg-[#0F1E3C]/90 text-white border border-white/10'
                            : 'bg-[#C9A84C]/90 text-white border border-white/10'
                        }`}>
                        For {type === 'sale' ? 'Sale' : 'Rent'}
                    </span>
                    {tag && (
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20">
                            {tag}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5" style={{ background: 'var(--card-bg)' }}>
                {/* Price */}
                <p className="font-bold text-xl mb-1" style={{ color: '#C9A84C' }}>
                    {formatPrice(price)}
                    {priceLabel && <span className="text-sm font-normal ml-1" style={{ color: 'var(--text-muted)' }}>/{priceLabel ?? 'yr'}</span>}
                </p>

                {/* Title */}
                <h3 className="font-bold text-base leading-snug mb-2 transition-colors group-hover:text-[#C9A84C]"
                    style={{ color: 'var(--text-primary)' }}>
                    {title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                    <MapPin size={13} className="text-[#C9A84C] shrink-0" />
                    <span className="truncate">{location}</span>
                </div>

                {/* Short desc */}
                <p className="text-sm leading-relaxed mb-4 line-clamp-2 flex-1" style={{ color: 'var(--text-secondary)' }}>
                    {shortDesc}
                </p>

                {/* Details bar */}
                {(bedrooms > 0 || size > 0) && (
                    <div className="flex items-center gap-4 text-sm border-t pt-3 mb-4"
                        style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                        {bedrooms > 0 && (
                            <span className="flex items-center gap-1">
                                <Bed size={15} className="text-[#C9A84C]" /> {bedrooms} Bed{bedrooms > 1 ? 's' : ''}
                            </span>
                        )}
                        {size > 0 && (
                            <span className="flex items-center gap-1">
                                <Maximize2 size={15} className="text-[#C9A84C]" /> {size} {sizeUnit}
                            </span>
                        )}
                    </div>
                )}

                {/* CTA */}
                <div className="flex items-center gap-1 font-semibold text-sm" style={{ color: '#C9A84C' }}>
                    View Details <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
