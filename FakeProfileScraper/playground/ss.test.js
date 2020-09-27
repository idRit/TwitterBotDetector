var stringSimilarity = require('string-similarity');
 
var similarity = stringSimilarity.compareTwoStrings('09:22 on Friday September 11th, over Ethiopia', '16:48 on Tuesday September 11th, over the North Africa');

console.log(similarity);