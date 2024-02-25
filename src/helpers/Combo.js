function isCombo(intervals) {
    const sum = intervals.reduce((a, b) => a + b, 0);
    const avg = sum/intervals.length || 0;
    const std = Math.sqrt(intervals.map(x => Math.pow(x - avg, 2)).reduce((a, b) => a + b) / intervals.length);
    const cv = (std / avg) * 100;
    console.log('sum: '+sum+" avg: "+avg+" std: "+std+" cv: "+cv);
    return cv < 5;
}

export default isCombo;