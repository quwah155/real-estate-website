import { useState, useMemo, useEffect } from 'react';
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
    const [searchParams, setSearchParams] = useSearchParams();
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
            <div className="bg-[#0F1E3C] pt-28 pb-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-3">Explore</p>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif mb-4">All Properties</h1>
                    <p className="text-white/60 max-w-lg mx-auto">
                        Browse our curated selection of premium properties across Lagos.
                    </p>
                </div>
            </div>

            <div className="bg-[#F8F7F4] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* Search + filter toggle */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by title, location..."
                                value={searchQ}
                                onChange={e => setSearchQ(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(s => !s)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-medium text-sm transition-colors ${showFilters ? 'bg-[#0F1E3C] text-white border-[#0F1E3C]' : 'bg-white text-gray-700 border-gray-200 hover:border-[#C9A84C]'}`}
                        >
                            <SlidersHorizontal size={16} />
                            Filters {hasFilters && <span className="w-5 h-5 rounded-full bg-[#C9A84C] text-white text-xs flex items-center justify-center">!</span>}
                        </button>
                        {hasFilters && (
                            <button onClick={resetFilters} className="flex items-center gap-1 px-4 py-3 text-sm text-gray-500 hover:text-red-500 transition-colors">
                                <X size={14} /> Clear
                            </button>
                        )}
                    </div>

                    {/* Filter panel */}
                    {showFilters && (
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {/* Type */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Property Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {['all', 'sale', 'rent'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setType(t)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${type === t ? 'bg-[#0F1E3C] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            {t === 'all' ? 'All' : t === 'sale' ? 'For Sale' : 'For Rent'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price range */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Price Range</label>
                                <select
                                    value={priceRange}
                                    onChange={e => setPriceRange(Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C9A84C]"
                                >
                                    {PRICE_RANGES.map((r, i) => (
                                        <option key={i} value={i}>{r.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Location</label>
                                <select
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C9A84C]"
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
                    <p className="text-sm text-gray-500 mb-6">
                        Showing <span className="font-semibold text-gray-800">{filtered.length}</span> properties
                    </p>

                    {/* Grid */}
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map(p => (
                                <PropertyCard key={p.id} property={p} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                <Search size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">No properties found</h3>
                            <p className="text-gray-400 mb-6">Try adjusting your filters or search term.</p>
                            <button onClick={resetFilters} className="bg-[#C9A84C] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#A0822A] transition-colors">
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
