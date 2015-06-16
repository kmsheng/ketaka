
module.exports.isNumber = function(n) {
  return ! isNaN(parseFloat(n)) && isFinite(n);
};

module.exports.inArray = function(arr, elem) {
  return -1 !== arr.indexOf(elem);
};
