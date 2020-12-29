function sortBy(array, ...bys) {
    function compare(a, b) {
        for (const by of bys) {
            const aValue = by(a);
            const bValue = by(b);
            const compared = typeof aValue === 'string'
                ? aValue.localeCompare(bValue)
                : aValue - bValue;
            if (compared !== 0) {
                return compared;
            }
        }
        return 0;
    }
    return [...array].sort(compare);
}
