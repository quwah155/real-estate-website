import { formatPrice } from '../utils/helpers';
import { Bed, Bath, Maximize2, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, className = '' }) => {
    const { id, title, type, price, priceLabel, location, shortDesc, bedrooms, size, sizeUnit, images, tag, featured } = property;

    return (
        <Link
            to={`/properties/${id}`}
            className={`group bg-white rounded-2xl overflow-hidden shadow-md card-hover flex flex-col ${className}`}
        >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={images[0]}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop'; }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Tags */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${type === 'sale' ? 'bg-[#0F1E3C] text-white' : 'bg-[#C9A84C] text-white'}`}>
                        For {type === 'sale' ? 'Sale' : 'Rent'}
                    </span>
                    {tag && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-[#C9A84C]">
                            {tag}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                {/* Price */}
                <p className="text-[#C9A84C] font-bold text-xl mb-1">
                    {formatPrice(price)}
                    {priceLabel && <span className="text-sm font-normal text-gray-500 ml-1">/{priceLabel ?? 'yr'}</span>}
                </p>

                {/* Title */}
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors">
                    {title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <MapPin size={13} className="text-[#C9A84C] shrink-0" />
                    <span className="truncate">{location}</span>
                </div>

                {/* Short desc */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{shortDesc}</p>

                {/* Details bar */}
                {(bedrooms > 0 || size > 0) && (
                    <div className="flex items-center gap-4 text-gray-600 text-sm border-t pt-3 mb-4">
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
                <div className="flex items-center gap-1 text-[#C9A84C] font-semibold text-sm group/cta">
                    View Details <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-1" />
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
