function groupByCount(data, by) {
    return data.reduce((counts, element) => {
        const key = by(element);
        counts[key] = (counts[key] || 0) + 1;
        return counts;
    }, {});
}
