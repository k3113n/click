function isCombo(time) {
    data = intervals(time); 
}

function intervals(timestamps) {
    return timestamps.map((time, index) =>{
        if(index > 0) {
            return time - timestamps[index-1];
        }
    }).slice(1);
}

export default isCombo;