var tempestString = 'Oh brave new world that has such people in it.';
// console.log(tempestString)
var comma = ", "
splitString(tempestString);
// console.log(tempestString)
function splitString(stringToSplit) {
    for(var i = 0; i < stringToSplit.length; i++) {
 
        stringToSplit = stringToSplit.replace(" ", ",");
        
       }
       var arrayOfStrings = stringToSplit.split(",");
       console.log(arrayOfStrings)
}
// var arrayOfStrings = tempestString.split(comma);
// console.log(arrayOfStrings)
  