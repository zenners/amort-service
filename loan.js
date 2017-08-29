var amortize = require('amortize');
var amount = 1200
var rate = 12
var totalTerm = 12

var amortObj = {
  amount,
  rate,
  totalTerm
}
var obj = {}

for (var i = 1; i <= totalTerm; i++){
  amortObj.amortizeTerm = i
  obj[i] = amortize(amortObj)
}

console.log(obj)
