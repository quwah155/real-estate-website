/**
 * Format a number as Nigerian Naira or USD
 * e.g. 95000000 → "₦95,000,000"
 */
export const format Price = (amount, currency = 'NGN') => {
    if (currency === 'NGN') {
        return '₦' + amount.toLocaleString('en-NG');
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
};

/**
 * Filter properties by type, price range, and location keyword.
 */
export const filterProperties = (properties, { type, minPrice, maxPrice, location }) => {
    return properties.filter(p => {
        if (type && type !== 'all' && p.type !== type) return false;
        if (minPrice && p.price < minPrice) return false;
        if (maxPrice && p.price > maxPrice) return false;
        if (location && location !== 'all') {
            const loc = p.location.toLowerCase();
            const q = location.toLowerCase();
            if (!loc.includes(q)) return false;
        }
        return true;
    });
};

/**
 * Get unique locations from property list
 */
export const getLocations = (properties) => {
    const seen = new Set();
    return properties
        .map(p => {
            // Extract area name before the comma
            const area = p.location.split(',')[0].trim();
            return area;
        })
        .filter(area => {
            if (seen.has(area)) return false;
            seen.add(area);
            return true;
        });
};
