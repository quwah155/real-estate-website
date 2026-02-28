import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import properties from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import { filterProperties, getLocations } from '../utils/helpers';

const PRICE_RANGES = [
    { label: 'Any Price', min: 0, max: Infinity },
    { label: 'Under ₦5M', min: 0, max: 5_000_000 },
    { label: '₦5M – ₦20M', min: 5_000_000, max: 20_000_000 },
    { label: '₦20M – ₦50M', min: 20_000_000, max: 50_000_000 },
    { label: '₦50M – ₦100M', min: 50_000_000, max: 100_000_000 },
    { label: 'Above ₦100M', min: 100_000_000, max: Infinity },
];

const Properties = () => {
    const [searchParams] = useSearchParams();
    const [type, setType] = useState(searchParams.get('type') || 'all');
    const [priceRange, setPriceRange] = useState(0);
    const [location, setLocation] = useState(searchParams.get('location') || 'all');
    const [searchQ, setSearchQ] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const locations = useMemo(() => getLocations(properties), []);

    const filtered = useMemo(() => {
        const { min, max } = PRICE_RANGES[priceRange];
        let results = filterProperties(properties, {
            type: type === 'all' ? null : type,
            minPrice: min === 0 ? null : min,
            maxPrice: max === Infinity ? null : max,
            location: location === 'all' ? null : location,
        });
        if (searchQ.trim()) {
            const q = searchQ.toLowerCase();
            results = results.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.location.toLowerCase().includes(q) ||
                p.shortDesc.toLowerCase().includes(q)
            );
        }
        return results;
    }, [type, priceRange, location, searchQ]);

    const resetFilters = () => {
        setType('all');
        setPriceRange(0);
        setLocation('all');
        setSearchQ('');
    };

    const hasFilters = type !== 'all' || priceRange !== 0 || location !== 'all' || searchQ !== '';

    return (
        <>
            {/* Page header */}
            <div style={{ background: 'var(--section-dark-bg)' }} className="pt-28 pb-14 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <p className="text-[#C9A84C] font-semibold text-xs uppercase tracking-widest mb-3">Explore</p>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif mb-4">All Properties</h1>
                    <div className="gold-divider max-w-20 mx-auto mb-4" />
                    <p className="max-w-lg mx-auto" style={{ color: 'var(--section-dark-text)' }}>
                        Browse our curated selection of premium properties across Lagos.
                    </p>
                </div>
            </div>

            <div className="min-h-screen py-10" style={{ background: 'var(--bg-primary)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Search + filter toggle */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search by title, location..."
                                value={searchQ}
                                onChange={e => setSearchQ(e.target.value)}
                                className="lk-input w-full pl-10 pr-4 py-3 rounded-xl border text-sm"
                                style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(s => !s)}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl border font-medium text-sm transition-all duration-200"
                            style={showFilters
                                ? { background: '#0F1E3C', color: '#fff', borderColor: '#0F1E3C' }
                                : { background: 'var(--card-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }
                            }
                        >
                            <SlidersHorizontal size={16} />
                            Filters {hasFilters && <span className="w-5 h-5 rounded-full bg-[#C9A84C] text-white text-xs flex items-center justify-center">!</span>}
                        </button>
                        {hasFilters && (
                            <button onClick={resetFilters} className="flex items-center gap-1 px-4 py-3 text-sm hover:text-red-400 transition-colors"
                                style={{ color: 'var(--text-muted)' }}>
                                <X size={14} /> Clear
                            </button>
                        )}
                    </div>

                    {/* Filter panel */}
                    {showFilters && (
                        <div className="rounded-2xl border p-6 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-6"
                            style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                            {/* Type */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Property Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {['all', 'sale', 'rent'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setType(t)}
                                            className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                                            style={type === t
                                                ? { background: '#0F1E3C', color: '#fff' }
                                                : { background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }
                                            }
                                        >
                                            {t === 'all' ? 'All' : t === 'sale' ? 'For Sale' : 'For Rent'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price range */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Price Range</label>
                                <select
                                    value={priceRange}
                                    onChange={e => setPriceRange(Number(e.target.value))}
                                    className="w-full px-3 py-2 rounded-xl border text-sm focus:outline-none"
                                    style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                                >
                                    {PRICE_RANGES.map((r, i) => (
                                        <option key={i} value={i}>{r.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Location</label>
                                <select
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border text-sm focus:outline-none"
                                    style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                                >
                                    <option value="all">All Locations</option>
                                    {locations.map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Results count */}
                    <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                        Showing <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{filtered.length}</span> properties
                    </p>

                    {/* Grid */}
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                            {filtered.map(p => (
                                <PropertyCard key={p.id} property={p} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                                style={{ background: 'var(--bg-tertiary)' }}>
                                <Search size={32} style={{ color: 'var(--text-muted)' }} />
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No properties found</h3>
                            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search term.</p>
                            <button onClick={resetFilters} className="bg-[#C9A84C] hover:bg-[#A0822A] text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors">
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Properties;
