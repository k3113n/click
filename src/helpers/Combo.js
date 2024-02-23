function isCombo(data) {
    const q1 = quartile(data, 0.25);
    const q3 = quartile(data, 0.75);

    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    const lastElement = data[data.length - 1];
    return (lastElement < lowerBound || lastElement > upperBound);
}

function quartile(data, percentile) {
    const index = percentile * (data.length - 1);
    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);
    const fraction = index - lowerIndex;
    return (1 - fraction) * data[lowerIndex] + fraction * data[upperIndex];
}

export default isCombo;