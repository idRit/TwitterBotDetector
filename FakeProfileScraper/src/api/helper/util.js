exports.randomInt = limit => Math.floor(Math.random() * Math.floor(limit));

exports.getBiggerStringLength = (str1, str2) => str1.length > str2.length ? str1.length : str2.length;

// exports.calculateAverage = arr => arr.reduce((a, b) => (a + b)) / arr.length;
exports.calculateAverage = arr => {
    let avg = arr[0];
    for (let i = 1; i < arr.length; i++) avg = (arr[i] + avg) / 2;
    return avg;
};

exports.calculateMax = arr => Math.max(...arr);

exports.calculateMin = arr => Math.min(...arr);

exports.capCheck = val => {
    if (val >= 1) return 1;
    return val;
}